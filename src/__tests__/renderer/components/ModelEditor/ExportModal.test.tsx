import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ExportModal from '../../../../renderer/components/ModelEditor/ExportModal';
import modelEditorReducer, { setExportModalOpen } from '../../../../renderer/store/modelEditor';
import { exportGraph } from '../../../../renderer/utils/exportGraph';
import { Graph } from '@antv/x6';
import { jest } from '@jest/globals';

// Mock the Graph class
jest.mock('@antv/x6', () => {
  const Graph = jest.fn().mockImplementation(() => ({}));
  return { Graph };
});

// Create a mock Graph instance
const mockGraph = new Graph({
  container: document.createElement('div'),
});

const mockFilename = 'test-graph';

// Create a test store with only the necessary slices
const store = configureStore({
  reducer: {
    modelEditor: modelEditorReducer,
  },
});

// Helper function to render components with Redux provider
const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('ExportModal Component', () => {
  beforeEach(() => {
    // Open the modal by dispatching the action
    store.dispatch(setExportModalOpen(true));
  });

  it('renders the ExportModal with expected content', () => {
    renderWithRedux(<ExportModal graph={mockGraph} filename={mockFilename} />);

    // Verify that the modal is in the document
    expect(screen.getByText('Export current model')).toBeInTheDocument();
    
    // Check format options
    expect(screen.getByText('JSON')).toBeInTheDocument();
    expect(screen.getByText('PNG')).toBeInTheDocument();
    expect(screen.getByText('JPEG')).toBeInTheDocument();
    expect(screen.getByText('SVG')).toBeInTheDocument();

    // Check submit and cancel buttons
    expect(screen.getByRole('button', { name: /Export/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('dispatches correct actions when the submit button is clicked', async () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    // Spy on the dispatch function
    renderWithRedux(<ExportModal graph={mockGraph} filename={mockFilename} />);

    // Select export format (e.g., JSON)
    fireEvent.click(screen.getByText('JSON'));

    // Simulate form submission by clicking the Export button
    fireEvent.click(screen.getByRole('button', { name: /Export/i }));

    // TODO: FIX THIS
    // expect(dispatch).toHaveBeenCalledWith(exportGraph({
    //   format: 'json', // Ensure this matches the default or selected format
    //   filename: mockFilename,
    //   graph: mockGraph,
    // }));
    expect(dispatch).toHaveBeenCalledWith(setExportModalOpen(false));

  });
});
