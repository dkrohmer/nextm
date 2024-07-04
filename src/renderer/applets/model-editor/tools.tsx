import { Graph, Registry } from '@antv/x6';

const registerEdgeSourceHandle = () => {
  if (!Registry.EdgeTool.registry.data['edge-source-handle']) {
    Graph.registerEdgeTool('edge-source-handle', {
      inherit: 'source-arrowhead',
      tagName: 'circle',
      attrs: {
        r: 5,
        fill: 'black',
        cursor: 'move',
      },
    });
  }
};

const registerEdgeTargetHandle = () => {
  if (!Registry.EdgeTool.registry.data['edge-target-handle']) {
    Graph.registerEdgeTool('edge-target-handle', {
      inherit: 'target-arrowhead',
      tagName: 'circle',
      attrs: {
        r: 5,
        fill: 'black',
        cursor: 'move',
      },
    });
  }
};

const registerEdgeVertices = () => {
  if (!Registry.EdgeTool.registry.data['edge-vertices']) {
    Graph.registerEdgeTool('edge-vertices', {
      inherit: 'vertices',
      stopPropagation: false,
      attrs: {
        r: 5,
        fill: 'black',
      },
    });
  }
};

const register = () => {
  registerEdgeVertices();
  registerEdgeSourceHandle();
  registerEdgeTargetHandle();
};

// const toggleTextMode = (cells: Cell[], isTextMode: boolean) => {
//   cells.forEach((cell: Cell) => {
//     cell.removeTools()
//     if (cell.isEdge()) {
//       // if in text mode, show labels and remove vertices
//       if (isTextMode) {
//         cell.addTools([
//           { name: 'edge-editor-active'},
//         ])

//       // if in edit mode, show vertices and remove labels
//       } else {
//         cell.addTools([
//           { name: 'edge-vertices'},
//           { name: 'edge-source-handle' },
//           { name: 'edge-target-handle' },
//         ])
//       }
//     }
//   });
// }

export default {
  register,
  // toggleTextMode
};
