import React from 'react';
import { Graph } from '@antv/x6';
import useSetupStencil from '../../hooks/model-editor/useSetupStencil';
import '../../styles/model-editor/stencil.css';

interface StencilContainerProps {
  graph: Graph;
}

const StencilContainer: React.FC<StencilContainerProps> = ({ graph }) => {
  /**
   * hooks
   */
  const stencilContainerRef = useSetupStencil(graph);

  /**
   * tsx
   */
  return (
    <div>
      <div ref={stencilContainerRef} className="stencil-container" />
    </div>
  );
};

export default StencilContainer;
