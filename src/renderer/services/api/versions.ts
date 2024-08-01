import { createAsyncThunk } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';
import type { IVersion } from '../../interfaces/IVersion';
import { RootState } from '../../store';
import { graphToPng } from '../../utils/model-editor/graphToPng';

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
      const dataUri = await graphToPng(graph);

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
