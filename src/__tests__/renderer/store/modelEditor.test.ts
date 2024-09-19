import reducer, {
  initialState,
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
  setExportFormat,
  setCanUndo,
  setCanRedo,
  ModelEditorState,
  DataflowStride,
} from '../../../renderer/store/modelEditor';
import { exportGraph } from '../../../renderer/utils/exportGraph';
import { importGraph } from '../../../renderer/utils/importGraph';

describe('modelEditorSlice', () => {
  let initialModelEditorState: ModelEditorState;

  beforeEach(() => {
    initialModelEditorState = { ...initialState };
  });

  it('should handle setSavePressed', () => {
    const state = reducer(initialModelEditorState, setSavePressed(true));
    expect(state.isSavePressed).toBe(true);
  });

  it('should handle setExportPressed', () => {
    const state = reducer(initialModelEditorState, setExportPressed(true));
    expect(state.isExportPressed).toBe(true);
  });

  it('should handle setImportPressed', () => {
    const state = reducer(initialModelEditorState, setImportPressed(true));
    expect(state.isImportPressed).toBe(true);
  });

  it('should handle setFitViewPressed', () => {
    const state = reducer(initialModelEditorState, setFitViewPressed(true));
    expect(state.isFitViewPressed).toBe(true);
  });

  it('should handle setZoomInPressed', () => {
    const state = reducer(initialModelEditorState, setZoomInPressed(true));
    expect(state.isZoomInPressed).toBe(true);
  });

  it('should handle setZoomOutPressed', () => {
    const state = reducer(initialModelEditorState, setZoomOutPressed(true));
    expect(state.isZoomOutPressed).toBe(true);
  });

  it('should handle setUndoPressed', () => {
    const state = reducer(initialModelEditorState, setUndoPressed(true));
    expect(state.isUndoPressed).toBe(true);
  });

  it('should handle setRedoPressed', () => {
    const state = reducer(initialModelEditorState, setRedoPressed(true));
    expect(state.isRedoPressed).toBe(true);
  });

  it('should handle setSelectAllPressed', () => {
    const state = reducer(initialModelEditorState, setSelectAllPressed(true));
    expect(state.isSelectAllPressed).toBe(true);
  });

  it('should handle setCutPressed', () => {
    const state = reducer(initialModelEditorState, setCutPressed(true));
    expect(state.isCutPressed).toBe(true);
  });

  it('should handle setCopyPressed', () => {
    const state = reducer(initialModelEditorState, setCopyPressed(true));
    expect(state.isCopyPressed).toBe(true);
  });

  it('should handle setPastePressed', () => {
    const state = reducer(initialModelEditorState, setPastePressed(true));
    expect(state.isPastePressed).toBe(true);
  });

  it('should handle setDeletePressed', () => {
    const state = reducer(initialModelEditorState, setDeletePressed(true));
    expect(state.isDeletePressed).toBe(true);
  });

  it('should handle setExportModalOpen', () => {
    const state = reducer(initialModelEditorState, setExportModalOpen(true));
    expect(state.isExportModalOpen).toBe(true);
  });

  it('should handle setImportModalOpen', () => {
    const state = reducer(initialModelEditorState, setImportModalOpen(true));
    expect(state.isImportModalOpen).toBe(true);
  });

  it('should handle setSelectedNodeId', () => {
    const state = reducer(initialModelEditorState, setSelectedNodeId('node-id'));
    expect(state.selectedNodeId).toBe('node-id');
  });

  it('should handle setSelectedEdgeId', () => {
    const state = reducer(initialModelEditorState, setSelectedEdgeId('edge-id'));
    expect(state.selectedEdgeId).toBe('edge-id');
  });

  it('should handle exportGraph.pending', () => {
    const action = { type: exportGraph.pending.type };
    const state = reducer(initialModelEditorState, action);
    expect(state.isExportPressed).toBe(true);
  });

  it('should handle exportGraph.fulfilled', () => {
    const action = { type: exportGraph.fulfilled.type };
    const state = reducer(initialModelEditorState, action);
    expect(state.isExportPressed).toBe(false);
  });

  it('should handle exportGraph.rejected', () => {
    const action = { type: exportGraph.rejected.type };
    const state = reducer(initialModelEditorState, action);
    expect(state.isExportPressed).toBe(false);
  });

  it('should handle importGraph.pending', () => {
    const action = { type: importGraph.pending.type };
    const state = reducer(initialModelEditorState, action);
    expect(state.isImportPressed).toBe(true);
  });

  it('should handle importGraph.fulfilled', () => {
    const action = { type: importGraph.fulfilled.type };
    const state = reducer(initialModelEditorState, action);
    expect(state.isImportPressed).toBe(false);
  });

  it('should handle importGraph.rejected', () => {
    const action = { type: importGraph.rejected.type };
    const state = reducer(initialModelEditorState, action);
    expect(state.isImportPressed).toBe(false);
  });

  it('should handle setActorModalOpen', () => {
    const state = reducer(initialModelEditorState, setActorModalOpen(true));
    expect(state.actorModalOpen).toBe(true);
  });

  it('should handle setActorModalSelectedCell', () => {
    const state = reducer(initialModelEditorState, setActorModalSelectedCell('actor-cell-id'));
    expect(state.actorModalSelectedCell).toBe('actor-cell-id');
  });

  it('should handle setActorName', () => {
    const state = reducer(initialModelEditorState, setActorName('New Actor'));
    expect(state.actorName).toBe('New Actor');
  });

  it('should handle setActorDescription', () => {
    const state = reducer(initialModelEditorState, setActorDescription('Actor description'));
    expect(state.actorDescription).toBe('Actor description');
  });

  it('should handle setSystemModalOpen', () => {
    const state = reducer(initialModelEditorState, setSystemModalOpen(true));
    expect(state.systemModalOpen).toBe(true);
  });

  it('should handle setSystemModalSelectedCell', () => {
    const state = reducer(initialModelEditorState, setSystemModalSelectedCell('system-cell-id'));
    expect(state.systemModalSelectedCell).toBe('system-cell-id');
  });

  it('should handle setSystemName', () => {
    const state = reducer(initialModelEditorState, setSystemName('New System'));
    expect(state.systemName).toBe('New System');
  });

  it('should handle setSystemStack', () => {
    const state = reducer(initialModelEditorState, setSystemStack('System Stack'));
    expect(state.systemStack).toBe('System Stack');
  });

  it('should handle setSystemDescription', () => {
    const state = reducer(initialModelEditorState, setSystemDescription('System description'));
    expect(state.systemDescription).toBe('System description');
  });

  it('should handle setZoneModalOpen', () => {
    const state = reducer(initialModelEditorState, setZoneModalOpen(true));
    expect(state.zoneModalOpen).toBe(true);
  });

  it('should handle setZoneModalSelectedCell', () => {
    const state = reducer(initialModelEditorState, setZoneModalSelectedCell('zone-cell-id'));
    expect(state.zoneModalSelectedCell).toBe('zone-cell-id');
  });

  it('should handle setZoneName', () => {
    const state = reducer(initialModelEditorState, setZoneName('New Zone'));
    expect(state.zoneName).toBe('New Zone');
  });

  it('should handle setZoneTrustLevel', () => {
    const state = reducer(initialModelEditorState, setZoneTrustLevel('High'));
    expect(state.zoneTrustLevel).toBe('High');
  });

  it('should handle setZoneDescription', () => {
    const state = reducer(initialModelEditorState, setZoneDescription('Zone description'));
    expect(state.zoneDescription).toBe('Zone description');
  });

  it('should handle setDataflowModalOpen', () => {
    const state = reducer(initialModelEditorState, setDataflowModalOpen(true));
    expect(state.dataflowModalOpen).toBe(true);
  });

  it('should handle setDataflowModalSelectedCell', () => {
    const state = reducer(initialModelEditorState, setDataflowModalSelectedCell('dataflow-cell-id'));
    expect(state.dataflowModalSelectedCell).toBe('dataflow-cell-id');
  });

  it('should handle setDataflowLabel', () => {
    const state = reducer(initialModelEditorState, setDataflowLabel('New Dataflow'));
    expect(state.dataflowLabel).toBe('New Dataflow');
  });

  it('should handle setDataflowProtocol', () => {
    const state = reducer(initialModelEditorState, setDataflowProtocol('TCP'));
    expect(state.dataflowProtocol).toBe('TCP');
  });

  it('should handle setDataflowStride', () => {
    const newStride: DataflowStride = {
      spoofing: true,
      tampering: false,
      repudiation: true,
      informationDisclosure: false,
      denialOfService: true,
      elevatePrivilege: false,
    };
    const state = reducer(initialModelEditorState, setDataflowStride(newStride));
    expect(state.dataflowStride).toEqual(newStride);
  });

  it('should handle setTextMode', () => {
    const state = reducer(initialModelEditorState, setTextMode(true));
    expect(state.isTextMode).toBe(true);
  });

  it('should handle setTextModeInputValue', () => {
    const state = reducer(initialModelEditorState, setTextModeInputValue('Text Input'));
    expect(state.textModeInputValue).toBe('Text Input');
  });

  it('should handle setTextModeSelectedCell', () => {
    const state = reducer(initialModelEditorState, setTextModeSelectedCell('text-cell-id'));
    expect(state.textModeSelectedCell).toBe('text-cell-id');
  });

  it('should handle setImportIsDragging', () => {
    const state = reducer(initialModelEditorState, setImportIsDragging(true));
    expect(state.importIsDragging).toBe(true);
  });

  it('should handle setImportError', () => {
    const state = reducer(initialModelEditorState, setImportError('Import Error'));
    expect(state.importError).toBe('Import Error');
  });

  it('should handle setImportFileName', () => {
    const state = reducer(initialModelEditorState, setImportFileName('filename.json'));
    expect(state.importFileName).toBe('filename.json');
  });

  it('should handle setImportJsonData', () => {
    const state = reducer(initialModelEditorState, setImportJsonData('{}'));
    expect(state.importJsonData).toBe('{}');
  });

  it('should handle setImportIsFileValid', () => {
    const state = reducer(initialModelEditorState, setImportIsFileValid(true));
    expect(state.importIsFileValid).toBe(true);
  });

  it('should handle setExportFormat', () => {
    const state = reducer(initialModelEditorState, setExportFormat('png'));
    expect(state.exportFormat).toBe('png');
  });

  it('should handle setCanUndo', () => {
    const state = reducer(initialModelEditorState, setCanUndo(true));
    expect(state.canUndo).toBe(true);
  });

  it('should handle setCanRedo', () => {
    const state = reducer(initialModelEditorState, setCanRedo(true));
    expect(state.canRedo).toBe(true);
  });
});
