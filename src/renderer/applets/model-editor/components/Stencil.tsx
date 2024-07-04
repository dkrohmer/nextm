import React, { useEffect, useRef } from 'react';
import { Graph } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil';

import actor from '../shapes/system';
import system from '../shapes/actor';
import zone from '../shapes/zone';
import dataflow from '../shapes/dataflow';

interface StencilContainerProps {
  graph: Graph;
}

const StencilContainer: React.FC<StencilContainerProps> = ({ graph }) => {
  const stencilContainerRef = useRef<HTMLDivElement>(null);

  const stencilContainerStyle: React.CSSProperties = {
    position: 'absolute',
    left: '32px',
    top: '130px',
    width: '135px',
    height: '400px',
    zIndex: 2,
  };

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

    // Assuming you might want to perform some cleanup or further actions
    // return () => {
    //   // Cleanup logic here if necessary
    // };
  }, [graph]); // Effect depends on `graph` prop

  // Since this component is used for side effects rather than rendering, return null
  return (
    <div>
      <div ref={stencilContainerRef} style={stencilContainerStyle} />
    </div>
  );
};

export default StencilContainer;
