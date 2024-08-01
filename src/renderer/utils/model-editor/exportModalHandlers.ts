import { Graph } from '@antv/x6';
import { setExportModalOpen } from '../../store/modelEditor';
import { exportGraph } from './exportGraph';
import { AppDispatch } from '../../store';
  
export function handleExportModalSubmit(format: string, filename: string, graph: Graph, dispatch: AppDispatch) {
  try {
    dispatch(exportGraph({ format, filename, graph }));
    dispatch(setExportModalOpen(false));
  } catch (error) {
    console.error('Export failed:', error);
  }
}

export function handleExportModalCancel(dispatch: AppDispatch) {
  dispatch(setExportModalOpen(false));
}