import React from 'react';
import { Graph as x6Graph }  from '@antv/x6';
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
  product: any;
  increment: any;
  model: any;
}

const Graph: React.FC<GraphProps> = ({ graph, product, increment, model }) => {
  return (
    <>
      <StencilContainer graph={graph} />
      <Toolbar graph={graph} />
      <ExportModal graph={graph} filename={`${product.name}_${increment.name}_${model.name}`} />
      <ImportModal graph={graph} />
      <ActorModal graph={graph} />
      <SystemModal graph={graph} />
      <ZoneModal graph={graph} />
      <DataflowModal graph={graph} />
    </>
  );
};

export default Graph;
