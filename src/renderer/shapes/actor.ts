import { Graph } from '@antv/x6';

const setActorAttrs = (name: string) => {
  return {
    body: {
      strokeWidth: 1,
      stroke: 'black',
      fill: 'white',
      rx: 2,
      ry: 2,
    },
    name: {
      text: name,
      refY: 0.5,
      refX: 0.5,
      textAnchor: 'middle',
      fontSize: 12,
    },
  };
};

const register = () => {
  try {
    Graph.registerNode(
      'actor',
      {
        inherit: 'rect',
        width: 80,
        height: 40,
        cursor: 'grab',

        data: {
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
        ],
      },
      true,
    );
  } catch (error) {
    console.log(error);
  }
};

const create = (graph: Graph) => {
  const node = graph.createNode({
    shape: 'actor',
  });
  const attrs = setActorAttrs('Actor');
  node.setAttrs(attrs);

  return node;
};

export default {
  register,
  create,
  setActorAttrs,
};
