import { Graph } from '@antv/x6';
import { AppDispatch } from '../../store';
import { setExportModalOpen, setImportModalOpen } from '../../store/modelEditor';
import actions from '../../services/model-editor/actions';
import { saveModel } from './saveModel';

export const handleSaveAndCloseSubmit = async (
  graph: Graph,
  modelId: string | undefined,
  latestVersion: any,
  dispatch: AppDispatch,
  navigate: (path: string) => void,
  productId: string | undefined,
  incrementId: string | undefined
) => {
  await saveModel(modelId, graph, latestVersion, dispatch);
  navigate(`/products/${productId}/increments/${incrementId}`);
};

export const handleExport = (dispatch: AppDispatch) => {
  dispatch(setExportModalOpen(true));
};

export const handleImport = (dispatch: AppDispatch) => {
  dispatch(setImportModalOpen(true));
};

export const handleFitView = (graph: Graph) => {
  actions.fitViewAction(graph);
};

export const handleZoomIn = (graph: Graph) => {
  actions.zoomInAction(graph);
};

export const handleZoomOut = (graph: Graph) => {
  actions.zoomOutAction(graph);
};

export const handleUndo = (graph: Graph) => {
  actions.undoAction(graph);
};

export const handleRedo = (graph: Graph) => {
  actions.redoAction(graph);
};

export const handleSelectAll = (graph: Graph) => {
  actions.selectAllAction(graph);
};

export const handleCut = (graph: Graph) => {
  actions.cutAction(graph);
};

export const handleCopy = (graph: Graph) => {
  actions.copyAction(graph);
};

export const handlePaste = (graph: Graph) => {
  actions.pasteAction(graph);
};

export const handleDelete = (graph: Graph) => {
  actions.deleteAction(graph);
};
