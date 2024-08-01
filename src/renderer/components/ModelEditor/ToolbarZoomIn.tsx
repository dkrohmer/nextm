import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { ZoomInOutlined } from '@ant-design/icons';
import { handleZoomIn } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarZoomInProps {
  graph: Graph;
}

const ToolbarZoomIn: React.FC<ToolbarZoomInProps> = ({ graph }) => {
  return (
    <Item
      name="zoomIn"
      tooltip="Zoom In (cmd + plus)"
      icon={<ZoomInOutlined />}
      onClick={() => handleZoomIn(graph)}
    />
  );
};

export default ToolbarZoomIn;
