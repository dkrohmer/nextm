import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { exportGraph } from '../utils/exportGraph';
import { importGraph } from '../utils/importGraph';

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

  importIsDragging: boolean;
  importError: string | null;
  importFileName: string | null;
  importJsonData: string | null;
  importIsFileValid: boolean;

  canUndo: boolean;
  canRedo: boolean;
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
  selectedNodeId: null,
  selectedEdgeId: null,
  actorModalOpen: false,
  actorModalSelectedCell: '',
  actorName: '',
  actorDescription: '',
  systemModalOpen: false,
  systemModalSelectedCell: '',
  systemName: '',
  systemStack: '',
  systemDescription: '',
  zoneModalOpen: false,
  zoneModalSelectedCell: '',
  zoneName: '',
  zoneTrustLevel: '',
  zoneDescription: '',
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
  isTextMode: false,
  textModeInputValue: '',
  textModeSelectedCell: '',

  importIsDragging: false,
  importError: null,
  importFileName: null,
  importJsonData: null,
  importIsFileValid: false,

  canUndo: false,
  canRedo: false
};

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
    setSelectedNodeId(state, action: PayloadAction<string | null>) {
      state.selectedNodeId = action.payload;
    },
    setSelectedEdgeId(state, action: PayloadAction<string | null>) {
      state.selectedEdgeId = action.payload;
    },
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
    setTextMode(state, action: PayloadAction<boolean>) {
      state.isTextMode = action.payload;
    },
    setTextModeInputValue(state, action: PayloadAction<string>) {
      state.textModeInputValue = action.payload;
    },
    setTextModeSelectedCell(state, action: PayloadAction<string>) {
      state.textModeSelectedCell = action.payload;
    },
    setImportIsDragging(state, action: PayloadAction<boolean>) {
      state.importIsDragging = action.payload;
    },
    setImportError(state, action: PayloadAction<string | null>) {
      state.importError = action.payload;
    },
    setImportFileName(state, action: PayloadAction<string | null>) {
      state.importFileName = action.payload;
    },
    setImportJsonData(state, action: PayloadAction<string | null>) {
      state.importJsonData = action.payload;
    },
    setImportIsFileValid(state, action: PayloadAction<boolean>) {
      state.importIsFileValid = action.payload;
    },
    setCanUndo(state, action: PayloadAction<boolean>) {
      state.canUndo = action.payload;
    },
    setCanRedo(state, action: PayloadAction<boolean>) {
      state.canRedo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // cases for exporting graph
      .addCase(exportGraph.pending, (state) => {
        state.isExportPressed = true;
      })
      .addCase(exportGraph.fulfilled, (state) => {
        state.isExportPressed = false;
      })
      .addCase(exportGraph.rejected, (state) => {
        state.isExportPressed = false;
      })
      // cases for importing graph
      .addCase(importGraph.pending, (state) => {
        state.isImportPressed = true;
      })
      .addCase(importGraph.fulfilled, (state) => {
        state.isImportPressed = false;
      })
      .addCase(importGraph.rejected, (state) => {
        state.isImportPressed = false;
      });
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
  setSelectedNodeId,
  setSelectedEdgeId,
  setActorModalOpen,
  setActorModalSelectedCell,
  setActorName,
  setActorDescription,
  setSystemModalOpen,
  setSystemModalSelectedCell,
  setSystemName,
  setSystemStack,
  setSystemDescription,
  setZoneModalOpen,
  setZoneModalSelectedCell,
  setZoneName,
  setZoneTrustLevel,
  setZoneDescription,
  setDataflowModalOpen,
  setDataflowModalSelectedCell,
  setDataflowLabel,
  setDataflowProtocol,
  setDataflowStride,
  setTextMode,
  setTextModeInputValue,
  setTextModeSelectedCell,  
  setImportIsDragging,
  setImportError,
  setImportFileName,
  setImportJsonData,
  setImportIsFileValid,
  setCanRedo,
  setCanUndo
} = modelEditorSlice.actions;

export type { DataflowStride };
export default modelEditorSlice.reducer;