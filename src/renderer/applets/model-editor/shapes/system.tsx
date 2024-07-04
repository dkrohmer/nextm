import { Graph } from "@antv/x6";

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
      fontSize: 12
    },
    stackBody: {
      ref: "stack",
      fill: "black",
      stroke: 'white',
      strokeWidth: 2,
      rx: 4,
      ry: 4,
      refWidth: '140%',
      refHeight: '140%',
      refX: '-20%',
      refY: '-20%',
    },
    stack: {
      ref: "name",
      text: stack,
      fill: "white",
      fontSize: 10,
      textAnchor: "middle",
      textVerticalAnchor: "middle",
      pointerEvents: "none",
      refY: -7
    },
  }
}

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
            selector: 'body'
          },
          {
            tagName: 'text',
            selector: 'name',
          },
          {
            tagName: 'rect',
            selector: 'stackBody'
          },
          {
            tagName: 'text',
            selector: 'stack',
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
  } catch (error) {
    console.log(error)
  }
}

const create = (graph: Graph) => {
  const node = graph.createNode({
    shape: 'system',
  })
  const attrs = setSystemAttrs('System', '')
  node.setAttrs(attrs)

  return node;
}

export default {
  register,
  create,
  setSystemAttrs
};