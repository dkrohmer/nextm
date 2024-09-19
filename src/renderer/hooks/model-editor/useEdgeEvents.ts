import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, Graph } from '@antv/x6';
import { RootState, AppDispatch } from '../../store';
import { 
  setSelectedEdgeId,
  setDataflowLabel,
  setDataflowProtocol,
  setDataflowStride,
  setDataflowModalSelectedCell,
  setDataflowModalOpen
} from '../../store/modelEditor';
import type { DataflowStride } from '../../store/modelEditor';

const mapStringToDataflowStride = (input: string): DataflowStride => {
  const sanitizedInput = input.replace(/[^STRIDEstride]/g, '');
  const result: DataflowStride = {
    spoofing: false,
    tampering: false,
    repudiation: false,
    informationDisclosure: false,
    denialOfService: false,
    elevatePrivilege: false,
  };
  for (const char of sanitizedInput) {
    switch (char.toUpperCase()) {
      case 'S':
        result.spoofing = true;
        break;
      case 'T':
        result.tampering = true;
        break;
      case 'R':
        result.repudiation = true;
        break;
      case 'I':
        result.informationDisclosure = true;
        break;
      case 'D':
        result.denialOfService = true;
        break;
      case 'E':
        result.elevatePrivilege = true;
        break;
    }
  }
  return result;
};

const useEdgeEvents = (graph?: Graph) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedEdgeId } = useSelector((state: RootState) => state.modelEditor);
  const { explicitObjectSelection } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    if (!graph) {
      return;
    }

    const edgeSelected = ({ cell }: { cell: Cell }) => {
      if (cell.isEdge()) {
        dispatch(setSelectedEdgeId(cell.id));
        cell.addTools(['edge-vertices', 'edge-source-handle', 'edge-target-handle']);
      }
    };

    const edgeUnselected = ({ cell }: { cell: Cell }) => {
      if (cell.isEdge() && selectedEdgeId && cell.id === selectedEdgeId) {
        dispatch(setSelectedEdgeId(null));
      }
      cell.removeTools();
    };

    const edgeContextmenu = ({ cell, e }: { cell: Cell; e: MouseEvent }) => {
      if (graph.getSelectedCells().length <= 1 && cell.isEdge()) {
        if (!explicitObjectSelection || (selectedEdgeId && cell.id === selectedEdgeId)) {
          e.stopPropagation();
          e.preventDefault();
          const label = cell.getLabelAt(0)!.attrs!.label!.text! as string;
          const protocol = cell.getLabelAt(0)!.attrs!.protocol!.text! as string;
          const stride = mapStringToDataflowStride(cell.getLabelAt(0)!.attrs!.stride!.text! as string);
          dispatch(setDataflowLabel(label));
          dispatch(setDataflowProtocol(protocol));
          dispatch(setDataflowStride(stride));
          dispatch(setDataflowModalSelectedCell(cell.id));
          dispatch(setDataflowModalOpen(true));
        }
      }
    };

    graph.on('edge:selected', edgeSelected);
    graph.on('edge:unselected', edgeUnselected);
    graph.on('edge:contextmenu', edgeContextmenu);

    return () => {
      graph.off('edge:selected', edgeSelected);
      graph.off('edge:unselected', edgeUnselected);
      graph.off('edge:contextmenu', edgeContextmenu);
    };
  }, [graph, dispatch, selectedEdgeId, explicitObjectSelection]);
};

export default useEdgeEvents;
