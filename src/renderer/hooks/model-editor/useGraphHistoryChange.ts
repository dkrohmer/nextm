import { useEffect } from 'react';
import { Graph } from '@antv/x6';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setCanRedo, setCanUndo } from '../../store/modelEditor';

const useGraphHistoryChange = (graph: Graph | undefined) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!graph) {
      dispatch(setCanRedo(false));
      dispatch(setCanUndo(false));
      return;
    }

    const handleHistoryChange = () => {
      dispatch(setCanRedo(graph.canRedo()));
      dispatch(setCanUndo(graph.canUndo()));
    };

    graph.on('history:change', handleHistoryChange);

    return () => {
      graph.off('history:change', handleHistoryChange);
    };
  }, [graph, setCanRedo, setCanUndo]);
};

export default useGraphHistoryChange;
