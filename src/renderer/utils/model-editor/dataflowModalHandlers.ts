import { Graph } from '@antv/x6';
import { 
  setDataflowModalOpen,
  setDataflowLabel,
  setDataflowProtocol,
  setDataflowStride,
  DataflowStride
} from '../../store/modelEditor';
import { AppDispatch } from '../../store';
import dataflow from '../../shapes/dataflow';

export function handleDataflowModalLabelChange(event: React.ChangeEvent<HTMLInputElement>, dispatch: AppDispatch) {
    dispatch(setDataflowLabel(event.target.value));
  }
  
export function handleDataflowModalProtocolChange(event: React.ChangeEvent<HTMLInputElement>, dispatch: AppDispatch) {
dispatch(setDataflowProtocol(event.target.value));
}

export function handleDataflowModalStrideChange(key: keyof DataflowStride, dataflowStride: DataflowStride, dispatch: AppDispatch) {
const updatedDataflowStride = {
    ...dataflowStride,
    [key]: !dataflowStride[key],
};
dispatch(setDataflowStride(updatedDataflowStride));
}

export function handleDataflowModalSubmit(
  graph: Graph, dataflowModalSelectedCell: string | null, 
  dataflowLabel: string, 
  dataflowProtocol: string, 
  dataflowStride: DataflowStride, 
  dispatch: AppDispatch
) {
  if (dataflowModalSelectedCell) {
    const cell = graph.getCellById(dataflowModalSelectedCell);
    if (cell.isEdge()) {
      const strideString = (Object.keys(dataflowStride) as Array<keyof DataflowStride>)
        .filter((key) => dataflowStride[key])
        .map((key) => key.charAt(0).toUpperCase())
        .join(' ');
      const label = dataflow.setDataflowLabel(dataflowLabel, dataflowProtocol, strideString);
      cell.setLabelAt(0, label);
    }
    dispatch(setDataflowModalOpen(false));
  }
}

export function handleDataflowModalCancel(dispatch: AppDispatch) {
dispatch(setDataflowModalOpen(false));
}