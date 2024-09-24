import { Graph } from '@antv/x6';

const setZoneAttrs = (name: string, trustLevel: string) => {
  return {
    body: {
      strokeWidth: 1,
      stroke: 'black',
      fill: 'rgba(255,255,255,0.0)',
      strokeDasharray: '4',
    },
    name: {
      text: name,
      refX: 0.5,
      refY: 20,
      textAnchor: 'middle',
      textVerticalAnchor: 'bottom',
      textSize: 12,
      textWrap: {
        text: name,
        ellipsis: true,
        height: 20,
      },
    },
    trustLevel: {
      ref: 'name',
      text: trustLevel,
      fill: 'black',
      fontSize: 10,
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
      pointerEvents: 'none',
      refY: 20,
      textWrap: {
        text: trustLevel,
        ellipsis: true,
        width: 60,
        height: 20,
      },
    },
  };
};

const register = () => {
  try {
    Graph.registerNode(
      'zone',
      {
        inherit: 'rect',
        resizing: true,
        width: 80,
        height: 40,
        cursor: 'grab',

        data: {
          parent: true,
          description: '',
        },

        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'name',
          },
          {
            tagName: 'text',
            selector: 'trustLevel',
          },
        ],
      },
      true,
    );
  } catch (error) {
    throw Error('Registering zone failed');
  }
};

const create = (graph: Graph) => {
  const node = graph.createNode({
    shape: 'zone',
  });
  const attrs = setZoneAttrs('Zone', '');
  node.setAttrs(attrs);

  return node;
};

export default {
  register,
  create,
  setZoneAttrs,
};
