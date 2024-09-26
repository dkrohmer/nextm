import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Graph as x6Graph } from '@antv/x6';
import CustomToolbar from '../../../../renderer/components/ModelEditor/Toolbar';
import modelEditorReducer from '../../../../renderer/store/modelEditor';

// Mock the sub-components
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarSave',
  () =>
    function () {
      return <div data-testid="toolbar-save">ToolbarSave</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarExport',
  () =>
    function () {
      return <div data-testid="toolbar-export">ToolbarExport</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarImport',
  () =>
    function () {
      return <div data-testid="toolbar-import">ToolbarImport</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarFitView',
  () =>
    function () {
      return <div data-testid="toolbar-fitview">ToolbarFitView</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarZoomIn',
  () =>
    function () {
      return <div data-testid="toolbar-zoomin">ToolbarZoomIn</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarZoomOut',
  () =>
    function () {
      return <div data-testid="toolbar-zoomout">ToolbarZoomOut</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarUndo',
  () =>
    function () {
      return <div data-testid="toolbar-undo">ToolbarUndo</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarRedo',
  () =>
    function () {
      return <div data-testid="toolbar-redo">ToolbarRedo</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarSelectAll',
  () =>
    function () {
      return <div data-testid="toolbar-selectall">ToolbarSelectAll</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarCut',
  () =>
    function () {
      return <div data-testid="toolbar-cut">ToolbarCut</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarCopy',
  () =>
    function () {
      return <div data-testid="toolbar-copy">ToolbarCopy</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarPaste',
  () =>
    function () {
      return <div data-testid="toolbar-paste">ToolbarPaste</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarDelete',
  () =>
    function () {
      return <div data-testid="toolbar-delete">ToolbarDelete</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ToolbarSaveAndClose',
  () =>
    function () {
      return <div data-testid="toolbar-saveandclose">ToolbarSaveAndClose</div>;
    },
);

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Create a test store with the necessary slices
const store = configureStore({
  reducer: {
    modelEditor: modelEditorReducer,
  },
});

// Helper function to render components with Redux provider
const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('CustomToolbar Component', () => {
  beforeEach(() => {
    // Set initial state for Redux store
    store.dispatch({
      type: 'modelEditor/setInitialData', // Use appropriate action if required
      payload: {},
    });
  });

  it('renders all toolbar components with the correct props', () => {
    renderWithRedux(<CustomToolbar graph={mockGraph} />);

    // Check if all toolbar components are rendered
    expect(screen.getByTestId('toolbar-save')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-export')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-import')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-fitview')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-zoomin')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-zoomout')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-undo')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-redo')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-selectall')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-cut')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-copy')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-paste')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-delete')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-saveandclose')).toBeInTheDocument();
  });

  // Additional tests can be added here as needed
});
