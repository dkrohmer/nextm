import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, Graph } from '@antv/x6';
import { RootState, AppDispatch } from '../../store';
import {
  setSelectedNodeId,
  setSelectedEdgeId,
  setTextModeInputValue,
  setTextModeSelectedCell,
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
} from '../../store/modelEditor';

const useNodeEvents = (graph?: Graph) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedNodeId } = useSelector(
    (state: RootState) => state.modelEditor,
  );
  const { explicitObjectSelection } = useSelector(
    (state: RootState) => state.settings,
  );

  useEffect(() => {
    if (!graph) return;

    const nodeSelected = ({ cell }: { cell: Cell }) => {
      if (cell.isNode()) {
        dispatch(setSelectedEdgeId(null));
        dispatch(setSelectedNodeId(cell.id));
      }
    };

    const nodeUnselected = ({ cell }: { cell: Cell }) => {
      if (cell.isNode() && selectedNodeId && cell.id === selectedNodeId) {
        dispatch(setSelectedNodeId(null));
        dispatch(setSelectedEdgeId(null));
      }
    };

    const nodeContextmenu = ({ cell, e }: { cell: Cell; e: MouseEvent }) => {
      if (graph.getSelectedCells().length <= 1 && cell.isNode()) {
        if (
          !explicitObjectSelection ||
          (selectedNodeId && cell.id === selectedNodeId)
        ) {
          e.stopPropagation();
          e.preventDefault();
          const inputValue = cell.getAttrs()!.text!.text! as string;
          dispatch(setTextModeInputValue(inputValue));
          dispatch(setTextModeSelectedCell(cell.id));

          if (cell.shape === 'actor') {
            const name = cell.getAttrs()!.name!.text! as string;
            const description = cell.getData()!.description! as string;

            dispatch(setActorName(name));
            dispatch(setActorDescription(description));
            dispatch(setActorModalSelectedCell(cell.id));
            dispatch(setActorModalOpen(true));
          } else if (cell.shape === 'system') {
            const name = cell.getAttrs()!.name!.text! as string;
            const stack = cell.getAttrs()!.stack!.text! as string;
            const description = cell.getData()!.description! as string;
            dispatch(setSystemName(name));
            dispatch(setSystemStack(stack));
            dispatch(setSystemDescription(description));
            dispatch(setSystemModalSelectedCell(cell.id));
            dispatch(setSystemModalOpen(true));
          } else if (cell.shape === 'zone') {
            const name = cell.getAttrs()!.name!.text! as string;
            const trustLevel = cell.getAttrs()!.trustLevel!.text! as string;
            const description = cell.getData()!.description! as string;

            dispatch(setZoneName(name));
            dispatch(setZoneTrustLevel(trustLevel));
            dispatch(setZoneDescription(description));
            dispatch(setZoneModalSelectedCell(cell.id));
            dispatch(setZoneModalOpen(true));
          }
        }
      }
    };

    graph.on('node:selected', nodeSelected);
    graph.on('node:unselected', nodeUnselected);
    graph.on('node:contextmenu', nodeContextmenu);

    return () => {
      graph.off('node:selected', nodeSelected);
      graph.off('node:unselected', nodeUnselected);
      graph.off('node:contextmenu', nodeContextmenu);
    };
  }, [graph, dispatch, selectedNodeId, explicitObjectSelection]);
};

export default useNodeEvents;
