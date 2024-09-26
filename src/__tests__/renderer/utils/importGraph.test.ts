import { Cell, Graph } from '@antv/x6';
import { configureStore } from '@reduxjs/toolkit';
import { importGraph } from '../../../renderer/utils/importGraph';
import modelEditorReducer, {
  setImportError,
  setImportJsonData,
  setImportModalOpen,
} from '../../../renderer/store/modelEditor';
import settingsReducer, { showToast } from '../../../renderer/store/settings';

const store = configureStore({
  reducer: {
    modelEditor: modelEditorReducer,
    settings: settingsReducer,
  },
});

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
    graphMock.getCells.mockReturnValue([new Cell(), new Cell()]);

    const importJsonData = { nodes: [], edges: [] };

    store.dispatch(setImportJsonData(JSON.stringify(importJsonData)));

    const result = await store.dispatch(
      importGraph({ graph: graphMock, jsonData: importJsonData }) as any,
    );

    expect(graphMock.fromJSON).toHaveBeenCalledWith(importJsonData);
    expect(graphMock.zoomToFit).toHaveBeenCalledWith({
      padding: { left: 200, right: 200 },
    });
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  it('should reject and dispatch error actions when the graph import fails', async () => {
    graphMock.getCells.mockReturnValue([]);

    const importJsonData = { nodes: [], edges: [] };

    const result = await store.dispatch(
      importGraph({ graph: graphMock, jsonData: importJsonData }) as any,
    );

    expect(graphMock.fromJSON).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('The graph payload is erroneous or empty.');
  });

  it('should reject and dispatch error when an exception is thrown', async () => {
    const mockError = new Error('Import failed');
    graphMock.fromJSON.mockImplementation(() => {
      throw mockError;
    });

    const importJsonData = { nodes: [], edges: [] };

    const result = await store.dispatch(
      importGraph({ graph: graphMock, jsonData: importJsonData }) as any,
    );

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(mockError);
  });

  it('should handle the ImportModal component correctly when a valid JSON is provided', async () => {
    store.dispatch(setImportModalOpen(true));
    store.dispatch(setImportJsonData(JSON.stringify({ nodes: [], edges: [] })));

    const promise = store.dispatch(
      importGraph({
        graph: graphMock,
        jsonData: { nodes: [], edges: [] },
      }) as any,
    );

    store.dispatch(
      showToast({
        promise,
        loadingMessage: 'Importing threat model...',
        successMessage: 'Threat model imported successfully',
        errorMessage: 'Failed to import threat model',
      }),
    );

    await promise;

    store.dispatch(setImportJsonData(null));
    store.dispatch(setImportModalOpen(false));

    expect(store.getState().modelEditor.isImportModalOpen).toBe(false);
    expect(store.getState().modelEditor.importFileName).toBeNull();
    expect(store.getState().modelEditor.importJsonData).toBeNull();
    expect(store.getState().modelEditor.importError).toBeNull();
    expect(store.getState().modelEditor.importIsFileValid).toBe(false);
  });

  it('should handle "No file selected" error', async () => {
    store.dispatch(setImportModalOpen(true));
    store.dispatch(setImportJsonData(null));

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
