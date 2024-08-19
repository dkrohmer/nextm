import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { ZoomInOutlined } from '@ant-design/icons';
import actions from '../../services/model-editor/actions';

interface ToolbarZoomInProps {
  graph: Graph;
}

const ToolbarZoomIn: React.FC<ToolbarZoomInProps> = ({ graph }) => {
  /**
   * handlers
   */
  const handleZoomIn = () => {
    actions.zoomInAction(graph);
  };
  
  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="zoomIn"
      tooltip="Zoom In (cmd + plus)"
      icon={<ZoomInOutlined />}
      onClick={handleZoomIn}
    />
  );
};

export default ToolbarZoomIn;
