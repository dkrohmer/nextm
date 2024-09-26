import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';
import { jest } from '@jest/globals';
import modelEditorReducer, {
  setActorModalOpen,
  setActorModalSelectedCell,
  setActorName,
  setActorDescription,
} from '../../../../renderer/store/modelEditor';
import ActorModal from '../../../../renderer/components/ModelEditor/ActorModal';
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

describe('ActorModal Component', () => {
  beforeEach(() => {
    store.dispatch(setActorModalOpen(true));
    (Graph as unknown as jest.Mock).mockImplementation(() => ({
      getCellById: jest.fn().mockReturnValue(mockCell),
    }));
  });

  it('renders the ActorModal with expected content', () => {
    renderWithRedux(<ActorModal graph={new Graph({})} />);

    expect(screen.getByTestId('actor-modal')).toBeInTheDocument();
    expect(screen.getByTestId('actor-modal-form')).toBeInTheDocument();

    expect(screen.getByText(/Edit Actor/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('handles form submission correctly and dispatches close action', async () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    store.dispatch(setActorName('New Actor Name'));
    store.dispatch(setActorDescription('New Description'));
    store.dispatch(setActorModalSelectedCell('mockCellId'));

    renderWithRedux(<ActorModal graph={new Graph({})} />);

    fireEvent.submit(screen.getByTestId('actor-modal-form'));

    await waitFor(() => {
      expect(mockCell.setAttrs).toHaveBeenCalled();
      expect(mockCell.setData).toHaveBeenCalledWith({
        description: 'New Description',
      });
    });

    expect(dispatch).toHaveBeenCalledWith(setActorModalOpen(false));
  });

  it('closes the modal on cancel button click', () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    renderWithRedux(<ActorModal graph={new Graph({})} />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(dispatch).toHaveBeenCalledWith(setActorModalOpen(false));
  });
});
