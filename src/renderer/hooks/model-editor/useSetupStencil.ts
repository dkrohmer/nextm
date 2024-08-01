import { useEffect, useRef } from 'react';
import { Graph } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil';
import actor from '../../shapes/actor';
import system from '../../shapes/system';
import zone from '../../shapes/zone';
import dataflow from '../../shapes/dataflow';

const useSetupStencil = (graph: Graph) => {
  const stencilContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!graph) {
      console.error('Graph is not provided');
      return;
    }

    if (graph && stencilContainerRef.current) {
      const stencil = new Stencil({
        target: graph,
        stencilGraphWidth: 250,
        stencilGraphHeight: 350,
        collapsable: false,
        groups: [
          {
            name: 'group1',
          },
        ],
        layoutOptions: {
          columns: 1,
        },
      });

      stencilContainerRef.current.appendChild(stencil.container);

      const a = actor.create(graph);
      const s = system.create(graph);
      const d = dataflow.createEdgeStencil(graph);
      const z = zone.create(graph);

      stencil.load([a, s, d, z], 'group1');
    }
  }, [graph]);

  return stencilContainerRef;
};

export default useSetupStencil;
