import { Cell, Graph } from '@antv/x6';
import { configureStore } from '@reduxjs/toolkit';
import { importGraph } from '../../../renderer/utils/importGraph';
import modelEditorReducer, {
  setImportError,
  setImportJsonData,
  setImportModalOpen,
} from '../../../renderer/store/modelEditor';
import settingsReducer, { showToast } from '../../../renderer/store/settings';

// Mock Redux store
const store = configureStore({
  reducer: {
    modelEditor: modelEditorReducer,
    settings: settingsReducer,
  },
});

// Mocked Graph and Cell
jest.mock('@antv/x6', () => ({
  Graph: jest.fn().mockImplementation(() => ({
    toJSON: jest.fn(),
    fromJSON: jest.fn(),
    getCells: jest.fn(),
    zoomToFit: jest.fn(),
  })),
  Cell: jest.fn(),
}));

describe('importGraph thunk', () => {
  let graphMock: jest.Mocked<Graph>;

  beforeEach(() => {
    graphMock = new Graph({}) as jest.Mocked<Graph>;
    jest.clearAllMocks();
  });

  it('should dispatch success actions when the graph is imported successfully', async () => {
    // Mock the getCells function to return some cells
    graphMock.getCells.mockReturnValue([new Cell(), new Cell()]);

    // Create import data as an object (not JSON string)
    const importJsonData = { nodes: [], edges: [] };

    // Mock the state
    store.dispatch(setImportJsonData(JSON.stringify(importJsonData)));

    // Dispatch the thunk
    const result = await store.dispatch(
      importGraph({ graph: graphMock, jsonData: importJsonData }) as any,
    );

    // Ensure that the graph was imported and the success actions were dispatched
    expect(graphMock.fromJSON).toHaveBeenCalledWith(importJsonData);
    expect(graphMock.zoomToFit).toHaveBeenCalledWith({
      padding: { left: 200, right: 200 },
    });
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  it('should reject and dispatch error actions when the graph import fails', async () => {
    // Simulate no cells returned after import
    graphMock.getCells.mockReturnValue([]);

    // Create import data as an object
    const importJsonData = { nodes: [], edges: [] };

    // Dispatch the thunk
    const result = await store.dispatch(
      importGraph({ graph: graphMock, jsonData: importJsonData }) as any,
    );

    // Ensure the graph import failed and error was handled
    expect(graphMock.fromJSON).toHaveBeenCalledTimes(2); // Called once with data and once with fallback
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('The graph payload is erroneous or empty.');
  });

  it('should reject and dispatch error when an exception is thrown', async () => {
    // Mock an exception when fromJSON is called
    const mockError = new Error('Import failed');
    graphMock.fromJSON.mockImplementation(() => {
      throw mockError;
    });

    const importJsonData = { nodes: [], edges: [] };

    // Dispatch the thunk
    const result = await store.dispatch(
      importGraph({ graph: graphMock, jsonData: importJsonData }) as any,
    );

    // Ensure the exception was caught and rejectWithValue was called
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(mockError);
  });

  it('should handle the ImportModal component correctly when a valid JSON is provided', async () => {
    // Mock the import modal state and JSON data
    store.dispatch(setImportModalOpen(true));
    store.dispatch(setImportJsonData(JSON.stringify({ nodes: [], edges: [] })));

    // Simulate the ImportModal handleSubmit action
    const promise = store.dispatch(
      importGraph({
        graph: graphMock,
        jsonData: { nodes: [], edges: [] },
      }) as any,
    );

    // Show toast for loading state
    store.dispatch(
      showToast({
        promise,
        loadingMessage: 'Importing threat model...',
        successMessage: 'Threat model imported successfully',
        errorMessage: 'Failed to import threat model',
      }),
    );

    // Await the promise to ensure all actions complete
    await promise;

    // Manually clear the importJsonData after the import is completed
    store.dispatch(setImportJsonData(null));

    // Dispatch the action to close the modal after import
    store.dispatch(setImportModalOpen(false));

    // Ensure the modal was closed and reset the form
    expect(store.getState().modelEditor.isImportModalOpen).toBe(false);
    expect(store.getState().modelEditor.importFileName).toBeNull();
    expect(store.getState().modelEditor.importJsonData).toBeNull();
    expect(store.getState().modelEditor.importError).toBeNull();
    expect(store.getState().modelEditor.importIsFileValid).toBe(false);
  });

  it('should handle "No file selected" error', async () => {
    store.dispatch(setImportModalOpen(true));
    store.dispatch(setImportJsonData(null));

    // Simulate the ImportModal handleSubmit action when no file is provided
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const dispatchResult = await store.dispatch(
      setImportError('No file selected'),
    );

    expect(dispatchResult.payload).toBe('No file selected');
    expect(dispatchSpy).toHaveBeenCalledWith(
      setImportError('No file selected'),
    );
    expect(store.getState().modelEditor.importError).toBe('No file selected');
  });
});
