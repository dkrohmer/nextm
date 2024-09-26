import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';
import { jest } from '@jest/globals';
import modelEditorReducer, {
  setDataflowModalOpen,
  setDataflowModalSelectedCell,
  setDataflowLabel,
  setDataflowProtocol,
  setDataflowStride,
} from '../../../../renderer/store/modelEditor';
import DataflowModal from '../../../../renderer/components/ModelEditor/DataflowModal';
import dataflow from '../../../../renderer/shapes/dataflow';
import '@testing-library/jest-dom';

jest.mock('@antv/x6', () => {
  const Graph = jest.fn().mockImplementation(() => ({
    createNode: jest.fn(),
    getCellById: jest.fn(),
    addEdge: jest.fn(),
  }));
  return { Graph };
});

jest.mock('../../../../renderer/shapes/dataflow', () => ({
  setDataflowLabel: jest.fn(),
  createEdgeStencil: jest.fn(),
  createEdge: jest.fn(),
  register: jest.fn(),
}));

const mockCell = {
  isEdge: jest.fn().mockReturnValue(true),
  setLabelAt: jest.fn(),
};

const store = configureStore({
  reducer: {
    modelEditor: modelEditorReducer,
  },
});

const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('DataflowModal Component', () => {
  beforeEach(() => {
    store.dispatch(setDataflowModalOpen(true));
    (Graph as unknown as jest.Mock).mockImplementation(() => ({
      getCellById: jest.fn().mockReturnValue(mockCell),
    }));
  });

  it('renders the DataflowModal with expected content', () => {
    renderWithRedux(<DataflowModal graph={new Graph({})} />);

    expect(screen.getByTestId('dataflow-modal')).toBeInTheDocument();
    expect(screen.getByTestId('dataflow-modal-form')).toBeInTheDocument();
    expect(screen.getByText(/Edit Dataflow/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('handles form submission correctly and dispatches close action', async () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    store.dispatch(setDataflowModalOpen(true));
    store.dispatch(setDataflowModalSelectedCell('mockCellId'));
    store.dispatch(setDataflowLabel('New Dataflow Label'));
    store.dispatch(setDataflowProtocol('Protocol A'));
    store.dispatch(
      setDataflowStride({
        spoofing: true,
        tampering: false,
        repudiation: true,
        informationDisclosure: false,
        denialOfService: true,
        elevatePrivilege: false,
      }),
    );

    const mockLabel = {
      markup: [
        { tagName: 'rect', selector: 'body' },
        { tagName: 'text', selector: 'label' },
        { tagName: 'rect', selector: 'protocolBody' },
        { tagName: 'text', selector: 'protocol' },
        { tagName: 'rect', selector: 'strideBody' },
        { tagName: 'text', selector: 'stride' },
      ],
      attrs: {
        label: { text: 'New Dataflow Label', fill: '#000', fontSize: 12 },
        protocol: { text: 'Protocol A', fill: 'white', fontSize: 10 },
        stride: { text: 'S R D', fill: '#ff0000', fontSize: 8 },
      },
    };

    (dataflow.setDataflowLabel as jest.Mock).mockReturnValue(mockLabel);

    renderWithRedux(<DataflowModal graph={new Graph({})} />);

    fireEvent.submit(screen.getByTestId('dataflow-modal-form'));

    await waitFor(() => {
      expect(mockCell.setLabelAt).toHaveBeenCalledWith(
        0,
        mockLabel,
      );
    });

    expect(dispatch).toHaveBeenCalledWith(setDataflowModalOpen(false));
  });

  it('closes the modal on cancel button click', () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    renderWithRedux(<DataflowModal graph={new Graph({})} />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(dispatch).toHaveBeenCalledWith(setDataflowModalOpen(false));
  });
});
