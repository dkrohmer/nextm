import { Graph } from '@antv/x6';
import { Transform } from '@antv/x6-plugin-transform';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
// import { MiniMap } from '@antv/x6-plugin-minimap'
import { Export } from '@antv/x6-plugin-export';

import './ModelEditor.css';

const topbar = document.getElementById('topbar');
const toolbar = document.getElementById('toolbar');
const topbarHeight = topbar ? topbar.offsetHeight : 0;
const toolbarHeight = toolbar ? toolbar.offsetHeight : 0;

const graphHeight = window.innerHeight - topbarHeight - toolbarHeight;

// const create = (container: HTMLDivElement, minimap: HTMLDivElement) => new Graph({
const create = (
  container: HTMLDivElement,
  gridVisible: 'none' | 'dot' | 'mesh',
) =>
  new Graph({
    container,
    grid: {
      visible: gridVisible !== 'none',
      type: gridVisible === 'dot' ? 'dot' : 'mesh', // 'dot' | 'fixedDot' | 'mesh'
    },
    width: window.innerWidth,
    // height: window.innerHeight,
    height: graphHeight,
    panning: {
      enabled: true,
      eventTypes: ['rightMouseDown', 'mouseWheel'],
      // eventTypes: ['rightMouseDown'],
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      global: true,
      minScale: 0.2,
      // maxScale: 4,
      factor: 1.1,
      modifiers: ['ctrl'],
    },
    connecting: {
      router: {
        name: 'normal',
        args: {
          offset: 'center',
        },
      },
      connector: {
        name: 'smooth',
        args: {
          radius: 2,
        },
      },
      anchor: 'center',
      connectionPoint: 'boundary',
      allowPort: false,
      allowLoop: true,
    },
    highlighting: {
      nodeAvailable: {
        name: 'stroke',
        args: {
          attrs: {
            'stroke-width': '2',
            padding: 0,
            stroke: 'green',
          },
        },
      },
    },
    embedding: {
      enabled: true,
      findParent({ node }) {
        const bbox = node.getBBox();
        return this.getNodes().filter((node) => {
          const data = node.getData<{ parent: boolean }>();
          if (data && data.parent) {
            const targetBBox = node.getBBox();
            return bbox.isIntersectWithRect(targetBBox);
          }
          return false;
        });
      },
    },
  })
    .use(
      new Transform({
        resizing: true,
      }),
    )
    .use(new Snapline())
    .use(
      new Selection({
        className: 'selection',
        rubberband: true,
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true,
        strict: true,
        movable: false,
        multipleSelectionModifiers: 'shift',
        pointerEvents: 'none',
      }),
    )
    .use(new Keyboard())
    .use(new Clipboard())
    .use(
      new History({
        beforeAddCommand: (event: string, args: any) => {
          let keepItemInHistory: boolean = true;
          // Ensure args is not null and check for change events on edge vertices
          if (args && args.current && args.current.items) {
            const { items } = args.current;
            for (const item of items) {
              if (
                item === 'edge-vertices' ||
                'edge-source-handle' ||
                'edge-target-handle'
              ) {
                keepItemInHistory = false;
              }
            }
          }

          if (args && args.previous && args.previous.items) {
            const { items } = args.previous;
            for (const item of items) {
              if (
                item === 'edge-vertices' ||
                'edge-source-handle' ||
                'edge-target-handle'
              ) {
                keepItemInHistory = false;
              }
            }
          }

          return keepItemInHistory;
        },
      }),
    )
    // .use(
    //   new MiniMap({
    //     container: minimap,
    //     width: 200,
    //     height: 160,
    //     padding: 10
    //   })
    // )
    .use(new Export());

export default {
  create,
};
