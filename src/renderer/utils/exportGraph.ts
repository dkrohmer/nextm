import { createAsyncThunk } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';

interface ExportJsonArgs {
  filename: string;
  graph: Graph;
}

interface ExportGraphArgs {
  exportFormat: string;
  filename: string;
  graph: Graph;
}

// Helper function to export the graph as JSON
const exportJSON = ({ filename, graph }: ExportJsonArgs) => {
  const jsonString = JSON.stringify(graph.toJSON(), null, 2); // Ensure using graph.toJSON()
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Thunk to export the graph
export const exportGraph = createAsyncThunk(
  'modelEditor/exportGraph',
  async ({ exportFormat, filename, graph }: ExportGraphArgs, { rejectWithValue }) => {
    try {
      switch (exportFormat) {
        case 'json':
          exportJSON({ filename, graph });
          return true;
        case 'png':
          graph.exportPNG(filename, { padding: 50, quality: 1.0 });
          return true;
        case 'jpeg':
          graph.exportJPEG(filename, { padding: 50, quality: 1.0 });
          return true;
        case 'svg':
          graph.exportSVG(filename);
          return true;
        default:
          return rejectWithValue('Invalid graph format.');
      }
    } catch (error) {
      return rejectWithValue('An error occurred during export.');
    }
  }
);
