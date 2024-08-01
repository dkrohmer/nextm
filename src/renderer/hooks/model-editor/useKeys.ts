import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Graph } from '@antv/x6';
import { AppDispatch, RootState } from '../../store';
import { saveModel } from '../../utils/model-editor/saveModel';
import { 
  setExportModalOpen, 
  setImportModalOpen, 
  setExportPressed, 
  setImportPressed, 
  setFitViewPressed, 
  setZoomInPressed, 
  setZoomOutPressed, 
  setUndoPressed, 
  setRedoPressed, 
  setCutPressed, 
  setCopyPressed, 
  setPastePressed, 
  setDeletePressed, 
  setSavePressed, 
  setSelectAllPressed 
} from '../../store/modelEditor';
import Actions from '../../services/model-editor/actions';

const useKeys = (graph: Graph | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const { modelId } = useParams();
  const { latestVersion } = useSelector((state: RootState) => state.versions);

  useEffect(() => {
    if (!graph) return;

    graph.bindKey(['meta+s', 'ctrl+s'], async () => {
      await saveModel(modelId, graph, latestVersion, dispatch);
      dispatch(setSavePressed(true));
    });

    graph.bindKey(['meta+e', 'ctrl+e'], () => {
      dispatch(setExportModalOpen(true));
      dispatch(setExportPressed(true));
    });

    graph.bindKey(['meta+i', 'ctrl+i'], () => {
      dispatch(setImportModalOpen(true));
      dispatch(setImportPressed(true));
    });

    graph.bindKey(['meta+space', 'ctrl+space'], () => {
      if (Actions.fitViewAction(graph)) {
        dispatch(setFitViewPressed(true));
      }
    });

    graph.bindKey(['meta+=', 'ctrl+='], () => {
      if (Actions.zoomInAction(graph)) {
        dispatch(setZoomInPressed(true));
      }
    });

    graph.bindKey(['meta+-', 'ctrl+-'], () => {
      if (Actions.zoomOutAction(graph)) {
        dispatch(setZoomOutPressed(true));
      }
    });

    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      if (Actions.undoAction(graph)) {
        dispatch(setUndoPressed(true));
      }
    });

    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      if (Actions.redoAction(graph)) {
        dispatch(setRedoPressed(true));
      }
    });

    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      if (Actions.selectAllAction(graph)) {
        dispatch(setSelectAllPressed(true));
      }
    });

    graph.bindKey(['meta+x', 'ctrl+x'], () => {
      if (Actions.cutAction(graph)) {
        dispatch(setCutPressed(true));
      }
    });

    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      if (Actions.copyAction(graph)) {
        dispatch(setCopyPressed(true));
      }
    });

    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      if (Actions.pasteAction(graph)) {
        dispatch(setPastePressed(true));
      }
    });

    graph.bindKey('backspace', () => {
      if (Actions.deleteAction(graph)) {
        dispatch(setDeletePressed(true));
      }
    });

    return () => {
      graph.unbindKey(['meta+s', 'ctrl+s']);
      graph.unbindKey(['meta+e', 'ctrl+e']);
      graph.unbindKey(['meta+i', 'ctrl+i']);
      graph.unbindKey(['meta+space', 'ctrl+space']);
      graph.unbindKey(['meta+=', 'ctrl+=']);
      graph.unbindKey(['meta+-', 'ctrl+-']);
      graph.unbindKey(['meta+z', 'ctrl+z']);
      graph.unbindKey(['meta+shift+z', 'ctrl+shift+z']);
      graph.unbindKey(['meta+a', 'ctrl+a']);
      graph.unbindKey(['meta+x', 'ctrl+x']);
      graph.unbindKey(['meta+c', 'ctrl+c']);
      graph.unbindKey(['meta+v', 'ctrl+v']);
      graph.unbindKey('backspace');
    };
  }, [graph, dispatch, modelId, latestVersion]);
};

export default useKeys;
