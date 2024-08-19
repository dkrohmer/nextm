import { createSlice } from '@reduxjs/toolkit';
import type { IVersion } from '../interfaces/IVersion';
import { fetchLatestVersion, addLatestVersion, fetchLatestVersionThumbnail } from '../services/api/versions';

interface VersionsState {
  latestVersion: IVersion | null;
  latestVersionIsLoading: boolean;
  latestVersionIsLoaded: boolean;
  latestVersionError: string | null;
  latestVersionThumbnails: { [modelId: string]: string | null };
  latestVersionThumbnailsIsLoading: { [modelId: string]: boolean };
  latestVersionThumbnailsIsLoaded: { [modelId: string]: boolean };
  latestVersionThumbnailsError: { [modelId: string]: string | null };
}

const initialState: VersionsState = {
  latestVersion: null,
  latestVersionIsLoading: false,
  latestVersionIsLoaded: false,
  latestVersionError: null,
  latestVersionThumbnails: {},
  latestVersionThumbnailsIsLoading: {},
  latestVersionThumbnailsIsLoaded: {},
  latestVersionThumbnailsError: {}
};

const versionsSlice = createSlice({
  name: 'versions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // cases for fetching latest version
      .addCase(fetchLatestVersion.pending, (state) => {
        state.latestVersionIsLoading = true;
        state.latestVersionIsLoaded = false;
        state.latestVersionError = null;
      })
      .addCase(fetchLatestVersion.fulfilled, (state, action) => {
        state.latestVersion = action.payload;
        state.latestVersionIsLoading = false;
        state.latestVersionIsLoaded = true;
      })
      .addCase(fetchLatestVersion.rejected, (state, action) => {
        state.latestVersionIsLoading = false;
        state.latestVersionIsLoaded = false;
        state.latestVersionError = action.payload as string;
      })
      // cases for adding latest version
      .addCase(addLatestVersion.pending, (state) => {
        state.latestVersionIsLoading = true;
        state.latestVersionIsLoaded = false;
        state.latestVersionError = null;
      })
      .addCase(addLatestVersion.fulfilled, (state, action) => {
        state.latestVersion = action.payload;
        state.latestVersionIsLoading = false;
        state.latestVersionIsLoaded = true;
      })
      .addCase(addLatestVersion.rejected, (state, action) => {
        state.latestVersionIsLoading = false;
        state.latestVersionIsLoaded = false;
        state.latestVersionError = action.payload as string;
      })
      // cases for fetching latest version thumbnails
      .addCase(fetchLatestVersionThumbnail.pending, (state, action) => {
        const modelId = action.meta.arg.modelId;
        state.latestVersionThumbnailsIsLoading[modelId] = true;
        state.latestVersionThumbnailsError[modelId] = null;
      })
      .addCase(fetchLatestVersionThumbnail.fulfilled, (state, action) => {
        const modelId = action.meta.arg.modelId;
        state.latestVersionThumbnails[modelId] = action.payload;
        state.latestVersionThumbnailsIsLoading[modelId] = false;
      })
      .addCase(fetchLatestVersionThumbnail.rejected, (state, action) => {
        const modelId = action.meta.arg.modelId;
        state.latestVersionThumbnailsIsLoading[modelId] = false;
        state.latestVersionThumbnailsError[modelId] = action.payload as string;
      });
  },
});

export const {} = versionsSlice.actions;

export default versionsSlice.reducer;
