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

export default {
  register,
};
