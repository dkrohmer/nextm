import { useEffect } from "react";
import { Cell, Graph } from "@antv/x6";

const useHoverCells = (graph?: Graph) => {

  useEffect(() => {
    if (!graph) return;

    const hoverCells = ({ cell }: { cell: Cell }) => {
      if (cell.isNode()) {
        cell.attr('body/strokeWidth', 2);
      } else if (cell.isEdge()) {
        cell.attr('line/strokeWidth', 2);
      }
    }

    const unhoverCells = ({ cell }: { cell: Cell }) => {
      if (cell.isNode()) {
        cell.attr('body/strokeWidth', 1);
      } else if (cell.isEdge()) {
        cell.attr('line/strokeWidth', 1);
      }
    }

    graph.on('cell:mouseenter', hoverCells);
    graph.on('cell:mouseleave', unhoverCells);

    return () => {
      graph.off('cell:mouseenter', hoverCells);
      graph.off('cell:mouseleave', unhoverCells);
    };
  }, [graph]);
};

export default useHoverCells;
