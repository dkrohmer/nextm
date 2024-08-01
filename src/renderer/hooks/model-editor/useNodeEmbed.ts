import { useEffect } from 'react';
import { Cell, Graph } from '@antv/x6';

const useNodeEmbed = (graph?: Graph) => {
  useEffect(() => {
    if (!graph) return;

    const updateZIndex = (cell: Cell, parentZIndex: number) => {
      const newZIndex = parentZIndex + 1;
      cell.setZIndex(newZIndex);
      const children = cell.getChildren();
      if (children) {
        children.forEach((child) => {
          updateZIndex(child, newZIndex);
        });
      }
    };

    const nodeEmbed = ({ cell }: { cell: Cell }) => {
      if (cell.hasParent()) {
        const parent = cell.getParent();
        if (parent) {
          const parentZIndex = parent.getZIndex() || 0;
          updateZIndex(cell, parentZIndex);
        }
      }
    };

    graph.on('node:change:parent', nodeEmbed);

    return () => {
      graph.off('node:change:parent', nodeEmbed);
    };
  }, [graph]);
};

export default useNodeEmbed;
