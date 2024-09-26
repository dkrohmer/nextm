import React from 'react';
import { useSelector } from 'react-redux';
import { Graph as x6Graph } from '@antv/x6';
import { RootState } from '../../store';
import ActorModal from './ActorModal';
import SystemModal from './SystemModal';
import DataflowModal from './DataflowModal';
import ZoneModal from './ZoneModal';
import ExportModal from './ExportModal';
import ImportModal from './ImportModal';
import StencilContainer from './Stencil';
import Toolbar from './Toolbar';

interface GraphProps {
  graph: x6Graph;
}

const Graph: React.FC<GraphProps> = ({ graph }) => {
  /**
   * global states
   */
  const { product } = useSelector((state: RootState) => state.products);
  const { increment } = useSelector((state: RootState) => state.increments);
  const { model } = useSelector((state: RootState) => state.models);

  /**
   * handlers
   */
  const handleFileName = () => {
    return `${product?.name}_${increment?.name}_${model?.name}`;
  };

  /**
   * tsx
   */
  return (
    <>
      <StencilContainer graph={graph} />
      <Toolbar graph={graph} />
      <ExportModal graph={graph} filename={handleFileName()} />
      <ImportModal graph={graph} />
      <ActorModal graph={graph} />
      <SystemModal graph={graph} />
      <ZoneModal graph={graph} />
      <DataflowModal graph={graph} />
    </>
  );
};

export default Graph;
