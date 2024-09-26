import { Graph } from '@antv/x6';

const setSystemAttrs = (name: string, stack: string) => {
  return {
    body: {
      strokeWidth: 1,
    },
    name: {
      text: name,
      refY: 0.5,
      refX: 0.5,
      textAnchor: 'middle',
      fontSize: 12,
      textWrap: {
        text: name,
        ellipsis: true,
        breakWord: true,
        height: 60,
      },
    },
    stackBody: {
      ref: 'stack',
      fill: 'black',
      stroke: 'black',
      strokeWidth: 6,
      rx: 4,
      ry: 4,
      refWidth: '100%',
      refHeight: '100%',
      refX: '0%',
      refY: '0%',
    },
    stack: {
      ref: 'name',
      text: stack,
      fill: 'white',
      fontSize: 10,
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
      pointerEvents: 'none',
      refY: -10,
      textWrap: {
        text: stack,
        ellipsis: true,
        height: 20,
      },
    },
  };
};

const register = () => {
  try {
    Graph.registerNode(
      'system',
      {
        inherit: 'circle',
        width: 80,
        height: 80,
        data: {
          description: '',
        },
        markup: [
          {
            tagName: 'circle',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'name',
          },
          {
            tagName: 'rect',
            selector: 'stackBody',
          },
          {
            tagName: 'text',
            selector: 'stack',
          },
        ],
      },
      true,
    );
  } catch (error) {
    throw Error('Registering system failed');
  }
};

const create = (graph: Graph) => {
  const node = graph.createNode({
    shape: 'system',
  });
  const attrs = setSystemAttrs('System', '');
  node.setAttrs(attrs);

  return node;
};

export default {
  register,
  create,
  setSystemAttrs,
};
