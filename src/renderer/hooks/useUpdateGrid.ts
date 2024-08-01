import { useEffect } from 'react';
import { Graph } from '@antv/x6';

const useUpdateGrid = (graph: Graph | undefined, gridVisible: string) => {
  useEffect(() => {
    if (graph) {
      graph.hideGrid();
      if (gridVisible !== 'none') {
        graph.showGrid();
        graph.drawGrid({ type: gridVisible });
      }
    }
  }, [graph, gridVisible]);
};

export default useUpdateGrid;
