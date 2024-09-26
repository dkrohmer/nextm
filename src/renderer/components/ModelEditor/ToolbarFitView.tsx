import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { CompressOutlined } from '@ant-design/icons';
import actions from '../../services/model-editor/actions';

interface ToolbarFitViewProps {
  graph: Graph;
}

const ToolbarFitView: React.FC<ToolbarFitViewProps> = ({ graph }) => {
  /**
   * handlers
   */
  const handleFitView = () => {
    actions.fitViewAction(graph);
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="fitView"
      tooltip="Fit View (cmd + whitespace)"
      icon={<CompressOutlined />}
      onClick={handleFitView}
    />
  );
};

export default ToolbarFitView;
