import { Graph, Node } from '@antv/x6';

const registerEdgeStencil = () => {
  Graph.registerNode(
    'dataflow-stencil',
    {
      inherit: 'path',
      width: 80,
      height: 40,
      zIndex: 3,
      markup: [
        {
          tagName: 'path',
          selector: 'boundary',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        boundary: {
          strokeWidth: 1.0,
          stroke: 'black',
          fill: 'transparent',
          refD: 'M 30 20 C 80 20 65 100 110 100',
        },
        label: {
          text: 'Data flow',
          fill: 'black',
          textVerticalAnchor: 'middle',
        },
        line: {
          targetMarker: 'block',
          sourceMarker: '',
        },
      },
    },
    true,
  );
};

const createEdgeStencil = (graph: Graph) => {
  return graph.createNode({
    shape: 'dataflow-stencil',
  });
};

const registerEdge = () => {
  try {
    Graph.registerEdge(
      'dataflow-edge',
      {
        inherit: 'edge',
        attrs: {
          line: {
            stroke: 'black',
            strokeWidth: 0.8,
          },
        },
      },
      true,
    );
  } catch (error) {
    console.log(error);
  }
};

const setDataflowLabel = (label: string, protocol: string, stride: string) => {
  return {
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
      {
        tagName: 'rect',
        selector: 'protocolBody',
      },
      {
        tagName: 'text',
        selector: 'protocol',
      },
      {
        tagName: 'rect',
        selector: 'strideBody',
      },
      {
        tagName: 'text',
        selector: 'stride',
      },
    ],
    attrs: {
      label: {
        text: label,
        fill: '#000',
        fontSize: 12,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
      },
      body: {
        ref: 'label',
        fill: '#fff',
        rx: 4,
        ry: 4,
        refWidth: '140%',
        refHeight: '140%',
        refX: '-20%',
        refY: '-20%',
      },
      protocol: {
        ref: 'label',
        text: protocol,
        fill: 'white',
        fontSize: 10,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
        pointerEvents: 'none',
        refY: -7,
      },
      protocolBody: {
        ref: 'protocol',
        fill: 'black',
        stroke: 'white',
        strokeWidth: 2,
        rx: 4,
        ry: 4,
        refWidth: '140%',
        refHeight: '140%',
        refX: '-20%',
        refY: '-20%',
      },
      stride: {
        ref: 'label',
        text: stride,
        fill: '#ff0000',
        fontSize: 8,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
        pointerEvents: 'none',
        refY: 20,
      },
      strideBody: {
        ref: 'stride',
        fill: '#fff',
        rx: 4,
        ry: 4,
        refWidth: '140%',
        refHeight: '140%',
        refX: '-20%',
        refY: '-20%',
      },
    },
  };
};

// the actual edge after being dragged to canvas
const createEdge = (graph: Graph, node: Node) => {
  const position = node.getPosition();
  const source = position;
  const target = {
    x: position.x + 100,
    y: position.y + 50,
  };

  const midpoint = {
    x: (source.x + target.x) / 2,
    y: (source.y + target.y) / 2,
  };

  const edge = graph.addEdge({
    shape: 'dataflow-edge',
    source,
    target,
    vertices: [midpoint],
  });

  const label = setDataflowLabel('Data flow', '', '');
  edge.appendLabel(label);
};

const register = () => {
  registerEdgeStencil();
  registerEdge();
};

export default {
  register,
  createEdgeStencil,
  createEdge,
  setDataflowLabel,
};
