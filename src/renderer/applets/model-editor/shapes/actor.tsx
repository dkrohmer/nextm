import { Graph } from "@antv/x6";

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
      fontSize: 12
    },
  }
}

const register = () => {
  try {
    Graph.registerNode(
      'actor',
      {
        inherit: 'rect',
        width: 80,
        height: 40,
        cursor: 'grab', //TODO
        
        data: {
          description: '',
        },

        markup: [
          {
            tagName: 'rect',
            selector: 'body'
          },
          {
            tagName: 'text',
            selector: 'name',
          },
        ],
        // propHooks(meta) {
        //   const { name, attributes, ...others } = meta
    
        //   if (!(name && attributes)) {
        //     return meta
        //   }
    
        //   const rects = [
        //     { type: 'name', text: name },
        //     { type: 'attrs', text: attributes },
        //   ]
    
        //   let offsetY = 0
        //   rects.forEach((rect) => {
        //     const height = rect.text.length * 12 + 16
        //     ObjectExt.setByPath(
        //       others,
        //       `attrs/${rect.type}-text/text`,
        //       rect.text.join('\n'),
        //     )
        //     ObjectExt.setByPath(others, `attrs/${rect.type}-rect/height`, height)
        //     ObjectExt.setByPath(
        //       others,
        //       `attrs/${rect.type}-rect/transform`,
        //       'translate(0,' + offsetY + ')',
        //     )
        //     offsetY += height
        //   })
    
        //   others.size = { width: 160, height: offsetY }
    
        //   return others
        // },
      },
      true,
    )
    // Graph.registerNode(
    //   'actor',
    //   {
    //     inherit: 'rect',
    //     width: 80,
    //     height: 40,
    //     cursor: 'grab', //TODO
    //     label: 'Actor',
    //     attrs: {
    //       body: {
    //         strokeWidth: 1,
    //         stroke: 'black',
    //         fill: 'white',
    //         rx: 2,
    //         ry: 2,
    //       },
    //       text: {
    //         fontSize: 12,
    //         fill: 'black',
    //       },
    //     },
    //     data: {
    //       description: '',
    //     },
    //   },
    //   true,
    // )
  } catch (error) {
    console.log(error)
  }
}

const create = (graph: Graph) => {
  const node = graph.createNode({
    shape: 'actor',
  })
  const attrs = setActorAttrs('Actor')
  node.setAttrs(attrs)

  return node;
}

export default {
  register,
  create,
  setActorAttrs
};