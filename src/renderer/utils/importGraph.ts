import { createAsyncThunk } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';

interface ImportGraphArgs {
  graph: Graph;
  jsonData: any;
}

export const importGraph = createAsyncThunk(
  'modelEditor/importGraph',
  async ({ graph, jsonData }: ImportGraphArgs, { rejectWithValue }) => {
    try {
      if (graph) {
        const fallback = graph.toJSON();
        graph.fromJSON(jsonData);
        const cells = graph.getCells();

        if (!cells || cells.length <= 0) {
          graph.fromJSON(fallback);
          return rejectWithValue('The graph payload is erroneous or empty.');
        }

        graph.zoomToFit({ padding: { left: 200, right: 200 } });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
