import { useEffect } from 'react';
import { Graph } from '@antv/x6';

const useGraphHistoryChange = (graph: Graph, setCanRedo: (canRedo: boolean) => void, setCanUndo: (canUndo: boolean) => void) => {
  useEffect(() => {
    const handleHistoryChange = () => {
      setCanRedo(graph.canRedo());
      setCanUndo(graph.canUndo());
    };

    graph.on('history:change', handleHistoryChange);

    return () => {
      graph.off('history:change', handleHistoryChange);
    };
  }, [graph, setCanRedo, setCanUndo]);
};

export default useGraphHistoryChange;
