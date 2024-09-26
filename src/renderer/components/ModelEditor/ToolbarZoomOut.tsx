import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { ZoomOutOutlined } from '@ant-design/icons';
import actions from '../../services/model-editor/actions';

interface ToolbarZoomOutProps {
  graph: Graph;
}

const ToolbarZoomOut: React.FC<ToolbarZoomOutProps> = ({ graph }) => {
  /**
   * handlers
   */
  const handleZoomOut = () => {
    actions.zoomOutAction(graph);
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="zoomOut"
      tooltip="Zoom Out (cmd + minus)"
      icon={<ZoomOutOutlined />}
      onClick={handleZoomOut}
    />
  );
};

export default ToolbarZoomOut;
