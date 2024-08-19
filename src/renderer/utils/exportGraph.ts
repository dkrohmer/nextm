import { createAsyncThunk } from '@reduxjs/toolkit';
import { Graph } from '@antv/x6';

interface ExportJsonArgs {
  filename: string;
  graph: Graph;
}

interface ExportGraphArgs {
  format: string;
  filename: string;
  graph: Graph;
}

const exportJSON = ({ filename, graph }: ExportJsonArgs) => {
  const jsonString = JSON.stringify(graph, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportGraph = createAsyncThunk(
  'modelEditor/exportGraph',
  async ({ format, filename, graph }: ExportGraphArgs, { rejectWithValue }) => {
    switch (format) {
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
  },
);
