import { createSlice } from '@reduxjs/toolkit';
import type { IVersion } from '../interfaces/IVersion';
import { fetchLatestVersion, addLatestVersion } from '../services/api/versions';

interface VersionsState {
  latestVersion: IVersion | null;
  latestVersionIsLoading: boolean;
  latestVersionIsLoaded: boolean;
  latestVersionError: string | null;
}

const initialState: VersionsState = {
  latestVersion: null,
  latestVersionIsLoading: false,
  latestVersionIsLoaded: false,
  latestVersionError: null,
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
      });
  },
});

export const {} = versionsSlice.actions;

export default versionsSlice.reducer;
