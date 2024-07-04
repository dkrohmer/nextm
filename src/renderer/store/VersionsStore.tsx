// src/store/IncrementsState.tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';
import type { IVersion } from '../interfaces/IVersion';

import { RootState } from '.';

interface IncrementsState {
  // states related to latestVersion
  latestVersion: IVersion | null;
  latestVersionIsLoading: boolean;
  latestVersionIsLoaded: boolean;
  latestVersionError: string | null;
}

const initialState: IncrementsState = {
  // states related to latestVersion
  latestVersion: null,
  latestVersionIsLoading: false,
  latestVersionIsLoaded: false,
  latestVersionError: null,
};

// interfaces
interface FetchLatestVersionArgs {
  modelId: string;
}

interface AddLatestVersionArgs {
  modelId: string;
  graph: Graph;
  x: number;
  y: number;
  height: number;
  width: number;
}

// get latest version
export const fetchLatestVersion = createAsyncThunk(
  'versions/fetchLatestVersion',
  async ({ modelId }: FetchLatestVersionArgs, { rejectWithValue }) => {
    try {
      // const response = await axios.get<IVersion>(`/api/versions/latest?modelId=${modelId}`);
      // return response.data;
      const response = await window.electron.getLatestVersion({ modelId });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to load increment.');
    }
  },
);

// Promisify the graph.toPNG function
const toPNGP = (graph: Graph): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      graph.toPNG(
        (dataUri: string) => {
          if (dataUri) {
            resolve(dataUri);
          } else {
            reject(new Error('Failed to generate PNG data URI'));
          }
        },
        {
          padding: {
            left: 25,
            right: 25,
            top: 25,
            bottom: 25,
          },
          quality: 1,
          width: 150,
          height: 125,
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

// Add latest version
export const addLatestVersion = createAsyncThunk<
  IVersion,
  {
    graph: Graph;
    modelId: string;
    x: number;
    y: number;
    height: number;
    width: number;
  },
  { state: RootState }
>(
  'versions/addLatestVersion',
  async (
    { modelId, graph, x, y, height, width }: AddLatestVersionArgs,
    { rejectWithValue },
  ) => {
    try {
      const dataUri = await toPNGP(graph);

      const response = window.electron.createVersion({
        modelId,
        payload: { graph: graph.toJSON() },
        thumbnail: dataUri,
        x,
        y,
        height,
        width,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const incrementsSlice = createSlice({
  name: 'versions',
  initialState,
  reducers: {
    // to do
  },
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

export const {} = incrementsSlice.actions;

export default incrementsSlice.reducer;
