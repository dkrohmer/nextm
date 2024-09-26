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

    // Update Z-Index when the node is embedded into a parent
    const nodeEmbed = ({ cell }: { cell: Cell }) => {
      if (cell.hasParent()) {
        const parent = cell.getParent();
        if (parent) {
          const parentZIndex = parent.getZIndex() || 0;
          updateZIndex(cell, parentZIndex);
        }
      }
    };

    // Bring the selected node upfront by updating its Z-Index
    const bringToFrontOnSelect = ({ cell }: { cell: Cell }) => {
      if (cell.shape !== 'zone') {
        // Get the highest z-index in the graph
        const maxZIndex = Math.max(
          ...graph.getCells().map((node) => node.getZIndex() || 0),
        );
        // Bring the selected node to the front by setting its z-index higher than the max
        cell.setZIndex(maxZIndex + 1);
      }
    };

    // Listen for node selection and z-index update
    graph.on('node:selected', bringToFrontOnSelect);

    // Listen for node embedding and z-index update
    graph.on('node:change:parent', nodeEmbed);

    return () => {
      graph.off('node:change:parent', nodeEmbed);
      graph.off('node:selected', bringToFrontOnSelect);
    };
  }, [graph]);
};

export default useNodeEmbed;
