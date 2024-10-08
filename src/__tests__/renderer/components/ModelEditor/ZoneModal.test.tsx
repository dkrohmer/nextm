import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';
import { jest } from '@jest/globals';
import ZoneModal from '../../../../renderer/components/ModelEditor/ZoneModal';
import modelEditorReducer, {
  setZoneModalOpen,
  setZoneModalSelectedCell,
  setZoneName,
  setZoneTrustLevel,
  setZoneDescription,
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

describe('ZoneModal Component', () => {
  beforeEach(() => {
    store.dispatch(setZoneModalOpen(true));
    (Graph as unknown as jest.Mock).mockImplementation(() => ({
      getCellById: jest.fn().mockReturnValue(mockCell),
    }));
  });

  it('renders the ZoneModal with expected content', () => {
    renderWithRedux(<ZoneModal graph={new Graph({})} />);

    expect(screen.getByTestId('zone-modal')).toBeInTheDocument();
    expect(screen.getByTestId('zone-modal-form')).toBeInTheDocument();

    expect(screen.getByText(/Edit Zone/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('handles form submission correctly and dispatches close action', async () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    store.dispatch(setZoneName('New Zone Name'));
    store.dispatch(setZoneTrustLevel('High'));
    store.dispatch(setZoneDescription('New Description'));
    store.dispatch(setZoneModalSelectedCell('mockCellId'));

    renderWithRedux(<ZoneModal graph={new Graph({})} />);

    fireEvent.submit(screen.getByTestId('zone-modal-form'));

    await waitFor(() => {
      expect(mockCell.setAttrs).toHaveBeenCalled();
      expect(mockCell.setData).toHaveBeenCalledWith({
        description: 'New Description',
      });
    });

    expect(dispatch).toHaveBeenCalledWith(setZoneModalOpen(false));
  });

  it('closes the modal on cancel button click', () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    renderWithRedux(<ZoneModal graph={new Graph({})} />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(dispatch).toHaveBeenCalledWith(setZoneModalOpen(false));
  });
});
