import { Graph } from '@antv/x6';

const fitViewAction = (graph: Graph) => {
  graph.zoomToFit({ padding: { left: 200, right: 200 } });
  return true;
};

const zoomInAction = (graph: Graph) => {
  graph.zoom(0.2);
  return true;
};

const zoomOutAction = (graph: Graph) => {
  graph.zoom(-0.2);
  return true;
};

const undoAction = (graph: Graph) => {
  if (graph.canUndo()) {
    graph.undo();
    return true;
  }
  return false;
};

const redoAction = (graph: Graph) => {
  if (graph.canRedo()) {
    graph.redo();
    return true;
  }
  return false;
};

const selectAllAction = (graph: Graph) => {
  const cells = graph.getCells();
  if (cells.length > 0) {
    graph.select(cells);
    return true;
  }
  return false;
};

const cutAction = (graph: Graph) => {
  const cells = graph.getSelectedCells();
  if (cells.length) {
    graph.cut(cells);
    return true;
  }
  return false;
};

const copyAction = (graph: Graph) => {
  const cells = graph.getSelectedCells();
  if (cells.length) {
    graph.copy(cells);
    return true;
  }
  return false;
};

const pasteAction = (graph: Graph) => {
  if (!graph.isClipboardEmpty()) {
    const cells = graph.paste({ offset: 32 });
    graph.cleanSelection();
    graph.select(cells);
    return true;
  }
  return false;
};

const deleteAction = (graph: Graph) => {
  const cells = graph.getSelectedCells();
  if (cells.length) {
    graph.removeCells(cells);
    return true;
  }
  return false;
};

export default {
  undoAction,
  redoAction,
  selectAllAction,
  cutAction,
  copyAction,
  pasteAction,
  deleteAction,
  fitViewAction,
  zoomInAction,
  zoomOutAction,
};
