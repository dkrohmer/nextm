import reducer, { initialState, VersionsState } from '../../../renderer/store/versions';
import { fetchLatestVersion, addLatestVersion, fetchLatestVersionThumbnail } from '../../../renderer/services/api/versions';
import type { IVersion } from '../../../renderer/interfaces/IVersion';

describe('versionsSlice', () => {
  let initialVersionsState: VersionsState;

  beforeEach(() => {
    initialVersionsState = { ...initialState };
  });

  describe('extraReducers for async actions', () => {
    it('should handle fetchLatestVersion.pending', () => {
      const action = { type: fetchLatestVersion.pending.type };
      const state = reducer(initialVersionsState, action);
      expect(state.latestVersionIsLoading).toBe(true);
      expect(state.latestVersionIsLoaded).toBe(false);
      expect(state.latestVersionError).toBeNull();
    });

    it('should handle fetchLatestVersion.fulfilled', () => {
      const mockVersion: IVersion = {
        id: '1',
        createdAt: '2024-09-01',
        payload: {},
        thumbnail: 'thumbnail-url',
        x: 100,
        y: 100,
        height: 200,
        width: 200,
      };
      const action = { type: fetchLatestVersion.fulfilled.type, payload: mockVersion };
      const state = reducer(initialVersionsState, action);
      expect(state.latestVersion).toEqual(mockVersion);
      expect(state.latestVersionIsLoading).toBe(false);
      expect(state.latestVersionIsLoaded).toBe(true);
    });

    it('should handle fetchLatestVersion.rejected', () => {
      const action = { type: fetchLatestVersion.rejected.type, payload: 'Fetch error' };
      const state = reducer(initialVersionsState, action);
      expect(state.latestVersionIsLoading).toBe(false);
      expect(state.latestVersionIsLoaded).toBe(false);
      expect(state.latestVersionError).toBe('Fetch error');
    });

    it('should handle addLatestVersion.pending', () => {
      const action = { type: addLatestVersion.pending.type };
      const state = reducer(initialVersionsState, action);
      expect(state.latestVersionIsLoading).toBe(true);
      expect(state.latestVersionIsLoaded).toBe(false);
      expect(state.latestVersionError).toBeNull();
    });

    it('should handle addLatestVersion.fulfilled', () => {
      const mockVersion: IVersion = {
        id: '2',
        createdAt: '2024-09-02',
        payload: {},
        thumbnail: 'thumbnail-url-2',
        x: 150,
        y: 150,
        height: 250,
        width: 250,
      };
      const action = { type: addLatestVersion.fulfilled.type, payload: mockVersion };
      const state = reducer(initialVersionsState, action);
      expect(state.latestVersion).toEqual(mockVersion);
      expect(state.latestVersionIsLoading).toBe(false);
      expect(state.latestVersionIsLoaded).toBe(true);
    });

    it('should handle addLatestVersion.rejected', () => {
      const action = { type: addLatestVersion.rejected.type, payload: 'Add error' };
      const state = reducer(initialVersionsState, action);
      expect(state.latestVersionIsLoading).toBe(false);
      expect(state.latestVersionIsLoaded).toBe(false);
      expect(state.latestVersionError).toBe('Add error');
    });

    it('should handle fetchLatestVersionThumbnail.pending', () => {
      const action = { type: fetchLatestVersionThumbnail.pending.type, meta: { arg: { modelId: '1' } } };
      const state = reducer(initialVersionsState, action);
      expect(state.latestVersionThumbnailsIsLoading['1']).toBe(true);
      expect(state.latestVersionThumbnailsError['1']).toBeNull();
    });

    it('should handle fetchLatestVersionThumbnail.fulfilled', () => {
      const mockThumbnail = 'thumbnail-url';
      const action = { type: fetchLatestVersionThumbnail.fulfilled.type, payload: mockThumbnail, meta: { arg: { modelId: '1' } } };
      const state = reducer(initialVersionsState, action);
      expect(state.latestVersionThumbnails['1']).toBe(mockThumbnail);
      expect(state.latestVersionThumbnailsIsLoading['1']).toBe(false);
    });

    it('should handle fetchLatestVersionThumbnail.rejected', () => {
      const action = { type: fetchLatestVersionThumbnail.rejected.type, payload: 'Thumbnail error', meta: { arg: { modelId: '1' } } };
      const state = reducer(initialVersionsState, action);
      expect(state.latestVersionThumbnailsIsLoading['1']).toBe(false);
      expect(state.latestVersionThumbnailsError['1']).toBe('Thumbnail error');
    });
  });
});
