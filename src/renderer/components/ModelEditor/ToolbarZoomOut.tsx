import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { ZoomOutOutlined } from '@ant-design/icons';
import { handleZoomOut } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarZoomOutProps {
  graph: Graph;
}

const ToolbarZoomOut: React.FC<ToolbarZoomOutProps> = ({ graph }) => {
  return (
    <Item
      name="zoomOut"
      tooltip="Zoom Out (cmd + minus)"
      icon={<ZoomOutOutlined />}
      onClick={() => handleZoomOut(graph)}
    />
  );
};

export default ToolbarZoomOut;
