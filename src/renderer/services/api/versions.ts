import { createAsyncThunk } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';
import type { IVersion } from '../../interfaces/IVersion';
import { graphToPng } from '../../utils/graphToPng';

interface FetchLatestVersionArgs {
  modelId: string;
}

interface FetchLatestVersionThumbnailArgs {
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

/**
 * get latest version
 */
export const fetchLatestVersion = createAsyncThunk<
  IVersion,
  FetchLatestVersionArgs
>('versions/fetchLatestVersion', async ({ modelId }, { rejectWithValue }) => {
  try {
    const response: IVersion = await window.electron.getLatestVersion({
      modelId,
    });
    return response;
  } catch (error) {
    return rejectWithValue('Failed to load increment.');
  }
});

/**
 * Get latest version thumbnail
 */
export const fetchLatestVersionThumbnail = createAsyncThunk<
  string,
  FetchLatestVersionThumbnailArgs
>(
  'versions/fetchLatestVersionThumbnail',
  async ({ modelId }, { rejectWithValue }) => {
    try {
      const response: string = await window.electron.getLatestVersionThumbnail({
        modelId,
      });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to load version thumbnail.');
    }
  },
);

/**
 * add latest version
 */
export const addLatestVersion = createAsyncThunk(
  'versions/addLatestVersion',
  async (
    {
      graph,
      modelId,
      x,
      y,
      height,
      width,
    }: {
      graph: Graph;
      modelId: string;
      x: number;
      y: number;
      height: number;
      width: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const dataUri = await graphToPng(graph);

      const response = await window.electron.createVersion({
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
      return rejectWithValue('Failed to create version.');
    }
  },
);
