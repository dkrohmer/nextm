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

    const bringToFrontOnSelect = ({ cell }: { cell: Cell }) => {
      if (cell.shape !== 'zone') {
        const maxZIndex = Math.max(
          ...graph.getCells().map((node) => node.getZIndex() || 0),
        );
        cell.setZIndex(maxZIndex + 1);
      }
    };

    graph.on('node:selected', bringToFrontOnSelect);
    graph.on('node:change:parent', nodeEmbed);

    return () => {
      graph.off('node:change:parent', nodeEmbed);
      graph.off('node:selected', bringToFrontOnSelect);
    };
  }, [graph]);
};

export default useNodeEmbed;
