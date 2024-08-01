import React from 'react';
import { Graph } from '@antv/x6';
import useSetupStencil from '../../hooks/model-editor/useSetupStencil';

interface StencilContainerProps {
  graph: Graph;
}

const StencilContainer: React.FC<StencilContainerProps> = ({ graph }) => {
  const stencilContainerRef = useSetupStencil(graph);

  const stencilContainerStyle: React.CSSProperties = {
    position: 'absolute',
    left: '32px',
    top: '130px',
    width: '135px',
    height: '400px',
    zIndex: 2,
  };

  return (
    <div>
      <div ref={stencilContainerRef} style={stencilContainerStyle} />
    </div>
  );
};

export default StencilContainer;
