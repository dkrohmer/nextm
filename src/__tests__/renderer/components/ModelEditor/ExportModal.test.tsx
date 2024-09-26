import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';
import { jest } from '@jest/globals';
import modelEditorReducer, {setExportModalOpen} from '../../../../renderer/store/modelEditor';
import ExportModal from '../../../../renderer/components/ModelEditor/ExportModal';

import '@testing-library/jest-dom';

jest.mock('@antv/x6', () => {
  const Graph = jest.fn().mockImplementation(() => ({}));
  return { Graph };
});

const mockGraph = new Graph({
  container: document.createElement('div'),
});

const mockFilename = 'test-graph';

const store = configureStore({
  reducer: {
    modelEditor: modelEditorReducer,
  },
});

const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('ExportModal Component', () => {
  beforeEach(() => {
    store.dispatch(setExportModalOpen(true));
  });

  it('renders the ExportModal with expected content', () => {
    renderWithRedux(<ExportModal graph={mockGraph} filename={mockFilename} />);

    expect(screen.getByText('Export current model')).toBeInTheDocument();
    expect(screen.getByText('JSON')).toBeInTheDocument();
    expect(screen.getByText('PNG')).toBeInTheDocument();
    expect(screen.getByText('JPEG')).toBeInTheDocument();
    expect(screen.getByText('SVG')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Export/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('dispatches correct actions when the submit button is clicked', async () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    renderWithRedux(<ExportModal graph={mockGraph} filename={mockFilename} />);

    fireEvent.click(screen.getByText('JSON'));
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
