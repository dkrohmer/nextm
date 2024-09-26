import { Graph } from '@antv/x6';
import { Transform } from '@antv/x6-plugin-transform';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
// import { MiniMap } from '@antv/x6-plugin-minimap'
import { Export } from '@antv/x6-plugin-export';

const topbar = document.getElementById('topbar');
const toolbar = document.getElementById('toolbar');
const topbarHeight = topbar ? topbar.offsetHeight : 0;
const toolbarHeight = toolbar ? toolbar.offsetHeight : 0;

const graphHeight = window.innerHeight - topbarHeight - toolbarHeight;

const create = (
  container: HTMLDivElement,
  gridVisible: 'none' | 'dot' | 'mesh',
) =>
  new Graph({
    container,
    grid: {
      visible: gridVisible !== 'none',
      type: gridVisible === 'dot' ? 'dot' : 'mesh',
    },
    width: window.innerWidth,
    height: graphHeight,
    panning: {
      enabled: true,
      eventTypes: ['rightMouseDown', 'mouseWheel'],
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      global: true,
      minScale: 0.2,
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
        const selectedCells = this.getSelectedCells();
    
        // multiselect currently not possible
        if (selectedCells.length > 1) {
          return [];
        }
    
        const bbox = node.getBBox();
        return this.getNodes().filter((potentialParent) => {
          const data = potentialParent.getData<{ parent: boolean }>();
          if (data && data.parent) {
            const targetBBox = potentialParent.getBBox();
            return (
              targetBBox.containsRect(bbox)
            );
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
        className: 'custom-selection',
        rubberband: false, // multiselect conflicts with embedding
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true,
        strict: true,
        movable: false,
        // multipleSelectionModifiers: 'shift', // multiselect conflicts with embedding
        pointerEvents: 'none',
      }),
    )
    .use(new Keyboard())
    .use(new Clipboard())
    .use(
      new History({
        beforeAddCommand: (event: string, args: any) => {
          let keepItemInHistory = true;
        
          // Check current items
          if (args && args.current && args.current.items) {
            const { items } = args.current;
            for (const item of items) {
              if (
                item === 'edge-vertices' ||
                item === 'edge-source-handle' ||
                item === 'edge-target-handle'
              ) {
                keepItemInHistory = false;
              }
            }
          }
        
          // Check previous items
          if (args && args.previous && args.previous.items) {
            const { items } = args.previous;
            for (const item of items) {
              if (
                item === 'edge-vertices' ||
                item === 'edge-source-handle' ||
                item === 'edge-target-handle'
              ) {
                keepItemInHistory = false;
              }
            }
          }
        
          // Check for mouse hover highlighting
          if (args && args.options && args.options.propertyPath) {
            if (
              args.options.propertyPath === 'attrs/line/strokeWidth' ||
              args.options.propertyPath === 'attrs/body/strokeWidth'
            ) {
              keepItemInHistory = false;
            }
          }
        
          return keepItemInHistory;
        },        
      }),
    )
    .use(new Export());

export default {
  create,
};