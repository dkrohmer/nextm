import { useEffect, useRef } from 'react';
import { Node, Graph } from '@antv/x6';
import Dataflow from '../../shapes/dataflow';

const useNodeAdded = (graph?: Graph) => {
  const processedNodes = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!graph) return;

    const nodeAdded = (node: Node) => {
      if (node.shape === 'dataflow-stencil') {
        if (processedNodes.current.has(node.id)) {
          node.remove();
          return;
        }

        Dataflow.createEdge(graph, node);
        node.remove();
        processedNodes.current.add(node.id);
      }
    };

    graph.on('node:added', ({ node }) => nodeAdded(node));

    return () => {
      graph.off('node:added', nodeAdded);
    };
  }, [graph]);
};

export default useNodeAdded;
