import { Graph } from '@antv/x6';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface DataflowStride {
  spoofing: boolean;
  tampering: boolean;
  repudiation: boolean;
  informationDisclosure: boolean;
  denialOfService: boolean;
  elevatePrivilege: boolean;
}

interface ModelEditorState {
  isSavePressed: boolean;
  isExportPressed: boolean;
  isImportPressed: boolean;
  isFitViewPressed: boolean;
  isZoomInPressed: boolean;
  isZoomOutPressed: boolean;
  isUndoPressed: boolean;
  isRedoPressed: boolean;
  isSelectAllPressed: boolean;
  isCutPressed: boolean;
  isCopyPressed: boolean;
  isPastePressed: boolean;
  isDeletePressed: boolean;
  isExportModalOpen: boolean;
  isImportModalOpen: boolean;

  selectedNodeId: string | null;
  selectedEdgeId: string | null;

  actorModalOpen: boolean;
  actorModalSelectedCell: string | null;
  actorName: string;
  actorDescription: string;

  systemModalOpen: boolean;
  systemModalSelectedCell: string | null;
  systemName: string;
  systemStack: string;
  systemDescription: string;

  zoneModalOpen: boolean;
  zoneModalSelectedCell: string | null;
  zoneName: string;
  zoneTrustLevel: string;
  zoneDescription: string;

  dataflowModalOpen: boolean;
  dataflowModalSelectedCell: string | null;
  dataflowLabel: string;
  dataflowProtocol: string;
  dataflowStride: DataflowStride;
  isTextMode: boolean; // deprecated
  textModeInputValue: string; // deprecated
  textModeSelectedCell: string; // deprecated
}

const initialState: ModelEditorState = {
  isSavePressed: false,
  isExportPressed: false,
  isImportPressed: false,
  isFitViewPressed: false,
  isZoomInPressed: false,
  isZoomOutPressed: false,
  isUndoPressed: false,
  isRedoPressed: false,
  isSelectAllPressed: false,
  isCutPressed: false,
  isCopyPressed: false,
  isPastePressed: false,
  isDeletePressed: false,
  isExportModalOpen: false,
  isImportModalOpen: false,
  // events values
  selectedNodeId: null,
  selectedEdgeId: null,
  // actor values
  actorModalOpen: false,
  actorModalSelectedCell: '',
  actorName: '',
  actorDescription: '',
  // system values
  systemModalOpen: false,
  systemModalSelectedCell: '',
  systemName: '',
  systemStack: '',
  systemDescription: '',
  // zone values
  zoneModalOpen: false,
  zoneModalSelectedCell: '',
  zoneName: '',
  zoneTrustLevel: '',
  zoneDescription: '',
  // dataflow values
  dataflowModalOpen: false,
  dataflowModalSelectedCell: '',
  dataflowLabel: '',
  dataflowProtocol: '',
  dataflowStride: {
    spoofing: false,
    tampering: false,
    repudiation: false,
    informationDisclosure: false,
    denialOfService: false,
    elevatePrivilege: false,
  },

  isTextMode: false, // deprecated
  textModeInputValue: '', // deprecated
  textModeSelectedCell: '', // deprecated
};

// interfaces
interface ExportGraphArgs {
  format: string;
  filename: string;
  graph: Graph;
}

interface ImportGraphArgs {
  graph: Graph;
  jsonData: any;
}

interface ExportJsonArgs {
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

// export graph
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

// import graph
export const importGraph = createAsyncThunk(
  'modelEditor/importGraph',
  async ({ graph, jsonData }: ImportGraphArgs, { rejectWithValue }) => {
    try {
      if (graph) {
        const fallback = graph.toJSON();
        graph.fromJSON(jsonData); // Ensure graphInstance is defined
        const cells = graph.getCells();
        console.log('Result: ', cells);

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

const modelEditorSlice = createSlice({
  name: 'modelEditor',
  initialState,
  reducers: {
    setSavePressed(state, action: PayloadAction<boolean>) {
      state.isSavePressed = action.payload;
    },
    setExportPressed(state, action: PayloadAction<boolean>) {
      state.isExportPressed = action.payload;
    },
    setImportPressed(state, action: PayloadAction<boolean>) {
      state.isImportPressed = action.payload;
    },
    setFitViewPressed(state, action: PayloadAction<boolean>) {
      state.isFitViewPressed = action.payload;
    },
    setZoomInPressed(state, action: PayloadAction<boolean>) {
      state.isZoomInPressed = action.payload;
    },
    setZoomOutPressed(state, action: PayloadAction<boolean>) {
      state.isZoomOutPressed = action.payload;
    },
    setUndoPressed(state, action: PayloadAction<boolean>) {
      state.isUndoPressed = action.payload;
    },
    setRedoPressed(state, action: PayloadAction<boolean>) {
      state.isRedoPressed = action.payload;
    },
    setSelectAllPressed(state, action: PayloadAction<boolean>) {
      state.isSelectAllPressed = action.payload;
    },
    setCutPressed(state, action: PayloadAction<boolean>) {
      state.isCutPressed = action.payload;
    },
    setCopyPressed(state, action: PayloadAction<boolean>) {
      state.isCopyPressed = action.payload;
    },
    setPastePressed(state, action: PayloadAction<boolean>) {
      state.isPastePressed = action.payload;
    },
    setDeletePressed(state, action: PayloadAction<boolean>) {
      state.isDeletePressed = action.payload;
    },
    setExportModalOpen(state, action: PayloadAction<boolean>) {
      state.isExportModalOpen = action.payload;
    },
    setImportModalOpen(state, action: PayloadAction<boolean>) {
      state.isImportModalOpen = action.payload;
    },
    // events values
    setSelectedNodeId(state, action: PayloadAction<string | null>) {
      state.selectedNodeId = action.payload;
    },
    setSelectedEdgeId(state, action: PayloadAction<string | null>) {
      state.selectedEdgeId = action.payload;
    },
    // actor values
    setActorModalOpen(state, action: PayloadAction<boolean>) {
      state.actorModalOpen = action.payload;
    },
    setActorModalSelectedCell(state, action: PayloadAction<string>) {
      state.actorModalSelectedCell = action.payload;
    },
    setActorName(state, action: PayloadAction<string>) {
      state.actorName = action.payload;
    },
    setActorDescription(state, action: PayloadAction<string>) {
      state.actorDescription = action.payload;
    },
    // system values
    setSystemModalOpen(state, action: PayloadAction<boolean>) {
      state.systemModalOpen = action.payload;
    },
    setSystemModalSelectedCell(state, action: PayloadAction<string>) {
      state.systemModalSelectedCell = action.payload;
    },
    setSystemName(state, action: PayloadAction<string>) {
      state.systemName = action.payload;
    },
    setSystemStack(state, action: PayloadAction<string>) {
      state.systemStack = action.payload;
    },
    setSystemDescription(state, action: PayloadAction<string>) {
      state.systemDescription = action.payload;
    },
    // zone values
    setZoneModalOpen(state, action: PayloadAction<boolean>) {
      state.zoneModalOpen = action.payload;
    },
    setZoneModalSelectedCell(state, action: PayloadAction<string>) {
      state.zoneModalSelectedCell = action.payload;
    },
    setZoneName(state, action: PayloadAction<string>) {
      state.zoneName = action.payload;
    },
    setZoneTrustLevel(state, action: PayloadAction<string>) {
      state.zoneTrustLevel = action.payload;
    },
    setZoneDescription(state, action: PayloadAction<string>) {
      state.zoneDescription = action.payload;
    },
    // dataflow values
    setDataflowModalOpen(state, action: PayloadAction<boolean>) {
      state.dataflowModalOpen = action.payload;
    },
    setDataflowModalSelectedCell(state, action: PayloadAction<string | null>) {
      state.dataflowModalSelectedCell = action.payload;
    },
    setDataflowLabel(state, action: PayloadAction<string>) {
      state.dataflowLabel = action.payload;
    },
    setDataflowProtocol(state, action: PayloadAction<string>) {
      state.dataflowProtocol = action.payload;
    },
    setDataflowStride(state, action: PayloadAction<DataflowStride>) {
      state.dataflowStride = action.payload;
    },
    // deprecated
    setTextMode(state, action: PayloadAction<boolean>) {
      state.isTextMode = action.payload;
    },
    setTextModeInputValue(state, action: PayloadAction<string>) {
      state.textModeInputValue = action.payload;
    },
    setTextModeSelectedCell(state, action: PayloadAction<string>) {
      state.textModeSelectedCell = action.payload;
    },
  },
});

export const {
  setSavePressed,
  setExportPressed,
  setImportPressed,
  setFitViewPressed,
  setZoomInPressed,
  setZoomOutPressed,
  setUndoPressed,
  setRedoPressed,
  setSelectAllPressed,
  setCutPressed,
  setCopyPressed,
  setPastePressed,
  setDeletePressed,
  setExportModalOpen,
  setImportModalOpen,
  // event values
  setSelectedNodeId,
  setSelectedEdgeId,
  // actor values
  setActorModalOpen,
  setActorModalSelectedCell,
  setActorName,
  setActorDescription,
  // system values
  setSystemModalOpen,
  setSystemModalSelectedCell,
  setSystemName,
  setSystemStack,
  setSystemDescription,
  // zone values
  setZoneModalOpen,
  setZoneModalSelectedCell,
  setZoneName,
  setZoneTrustLevel,
  setZoneDescription,
  // dataflow values
  setDataflowModalOpen,
  setDataflowModalSelectedCell,
  setDataflowLabel,
  setDataflowProtocol,
  setDataflowStride,

  setTextMode, // deprecated
  setTextModeInputValue, // deprecated
  setTextModeSelectedCell, // deprecated
} = modelEditorSlice.actions;

export type { DataflowStride };

export default modelEditorSlice.reducer;
