import { configureStore } from '@reduxjs/toolkit';
import { Graph as x6Graph } from '@antv/x6';
import versionsReducer from '../../../../renderer/store/versions';
import {
  fetchLatestVersion,
  fetchLatestVersionThumbnail,
  addLatestVersion,
} from '../../../../renderer/services/api/versions';
import windowElectron from '../../../../../mocks/window-electron';
import { graphToPng } from '../../../../renderer/utils/graphToPng';

// Mock graphToPng utility
jest.mock('../../../../renderer/utils/graphToPng', () => ({
  graphToPng: jest.fn().mockResolvedValue('data:image/png;base64,...'),
}));

// Mock the Graph constructor to avoid DOM issues
jest.mock('@antv/x6', () => ({
  Graph: jest.fn().mockImplementation(() => ({
    toJSON: jest.fn().mockReturnValue({ nodes: [], edges: [] }),
  })),
}));

// Set up a test store with the versionsReducer slice
const store = configureStore({
  reducer: {
    versions: versionsReducer,
  },
});

// Tests for versions thunks
describe('Versions Thunks with Redux Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fetchLatestVersion and updates the store on success', async () => {
    const mockVersion = { id: '1', name: 'Version 1', createdAt: '2023-09-01' };

    window.electron = {
      ...windowElectron,
      getLatestVersion: jest.fn().mockResolvedValue(mockVersion),
    };

    // Dispatch the fetchLatestVersion thunk
    await store.dispatch(fetchLatestVersion({ modelId: 'model-123' }));

    const state = store.getState().versions;
    expect(window.electron.getLatestVersion).toHaveBeenCalledWith({
      modelId: 'model-123',
    });
    expect(state.latestVersion).toEqual(mockVersion);
  });

  it('handles fetchLatestVersion failure correctly', async () => {
    window.electron.getLatestVersion = jest
      .fn()
      .mockRejectedValue(new Error('Failed to load increment.'));

    // Dispatch the fetchLatestVersion thunk
    await store.dispatch(fetchLatestVersion({ modelId: 'model-123' }));

    const state = store.getState().versions;
    expect(state.latestVersionError).toBe('Failed to load increment.');
  });

  it('dispatches fetchLatestVersionThumbnail and updates the store on success', async () => {
    const mockThumbnail = 'data:image/png;base64,...';

    window.electron = {
      ...windowElectron,
      getLatestVersionThumbnail: jest.fn().mockResolvedValue(mockThumbnail),
    };

    // Dispatch the fetchLatestVersionThumbnail thunk
    await store.dispatch(fetchLatestVersionThumbnail({ modelId: 'model-123' }));

    const state = store.getState().versions;
    expect(window.electron.getLatestVersionThumbnail).toHaveBeenCalledWith({
      modelId: 'model-123',
    });
    expect(state.latestVersionThumbnails['model-123']).toEqual(mockThumbnail);
  });

  it('handles fetchLatestVersionThumbnail failure correctly', async () => {
    window.electron.getLatestVersionThumbnail = jest
      .fn()
      .mockRejectedValue(new Error('Failed to load version thumbnail.'));

    // Dispatch the fetchLatestVersionThumbnail thunk
    await store.dispatch(fetchLatestVersionThumbnail({ modelId: 'model-123' }));

    const state = store.getState().versions;
    expect(state.latestVersionThumbnailsError['model-123']).toBe(
      'Failed to load version thumbnail.',
    );
  });

  it('dispatches addLatestVersion and updates the store on success', async () => {
    const mockVersion = { id: '1', name: 'Version 1', createdAt: '2023-09-01' };

    // Create a mock x6Graph instance
    const mockGraph = new x6Graph({
      container: document.createElement('div'),
    });

    window.electron = {
      ...windowElectron,
      createVersion: jest.fn().mockResolvedValue(mockVersion),
    };

    // Dispatch the addLatestVersion thunk
    await store.dispatch(
      addLatestVersion({
        modelId: 'model-123',
        graph: mockGraph,
        x: 0,
        y: 0,
        height: 200,
        width: 200,
      }),
    );

    const state = store.getState().versions;
    expect(graphToPng).toHaveBeenCalledWith(mockGraph); // Check if graphToPng was called
    expect(window.electron.createVersion).toHaveBeenCalledWith({
      modelId: 'model-123',
      payload: { graph: mockGraph.toJSON() },
      thumbnail: 'data:image/png;base64,...',
      x: 0,
      y: 0,
      height: 200,
      width: 200,
    });
    expect(state.latestVersion).toEqual(mockVersion);
  });

  it('handles addLatestVersion failure correctly', async () => {
    // Create a mock x6Graph instance
    const mockGraph = new x6Graph({
      container: document.createElement('div'),
    });

    window.electron.createVersion = jest
      .fn()
      .mockRejectedValue(new Error('Failed to create version.'));

    // Dispatch the addLatestVersion thunk
    await store.dispatch(
      addLatestVersion({
        graph: mockGraph,
        modelId: 'model-123',
        x: 0,
        y: 0,
        height: 200,
        width: 200,
      }),
    );

    const state = store.getState().versions;
    expect(state.latestVersionError).toBe('Failed to create version.');
  });
});
