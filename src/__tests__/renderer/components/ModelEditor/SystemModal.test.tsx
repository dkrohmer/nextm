import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';
import { jest } from '@jest/globals';
import SystemModal from '../../../../renderer/components/ModelEditor/SystemModal';
import modelEditorReducer, {
  setSystemModalOpen,
  setSystemModalSelectedCell,
  setSystemName,
  setSystemStack,
  setSystemDescription,
} from '../../../../renderer/store/modelEditor';
import '@testing-library/jest-dom';

jest.mock('@antv/x6', () => {
  const Graph = jest.fn().mockImplementation(() => ({
    getCellById: jest.fn(),
  }));
  return { Graph };
});

const mockCell = {
  isNode: jest.fn().mockReturnValue(true),
  setAttrs: jest.fn(),
  setData: jest.fn(),
};

const store = configureStore({
  reducer: {
    modelEditor: modelEditorReducer,
  },
});

const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('SystemModal Component', () => {
  beforeEach(() => {
    store.dispatch(setSystemModalOpen(true));
    (Graph as unknown as jest.Mock).mockImplementation(() => ({
      getCellById: jest.fn().mockReturnValue(mockCell),
    }));
  });

  it('renders the SystemModal with expected content', () => {
    renderWithRedux(<SystemModal graph={new Graph({})} />);

    expect(screen.getByTestId('system-modal')).toBeInTheDocument();
    expect(screen.getByTestId('system-modal-form')).toBeInTheDocument();

    expect(screen.getByText(/Edit System/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('handles form submission correctly and dispatches close action', async () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    store.dispatch(setSystemName('New System Name'));
    store.dispatch(setSystemStack('New Stack'));
    store.dispatch(setSystemDescription('New Description'));
    store.dispatch(setSystemModalSelectedCell('mockCellId'));

    renderWithRedux(<SystemModal graph={new Graph({})} />);

    fireEvent.submit(screen.getByTestId('system-modal-form'));

    await waitFor(() => {
      expect(mockCell.setAttrs).toHaveBeenCalled();
      expect(mockCell.setData).toHaveBeenCalledWith({
        description: 'New Description',
      });
    });

    expect(dispatch).toHaveBeenCalledWith(setSystemModalOpen(false));
  });

  it('closes the modal on cancel button click', () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    renderWithRedux(<SystemModal graph={new Graph({})} />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(dispatch).toHaveBeenCalledWith(setSystemModalOpen(false));
  });
});
