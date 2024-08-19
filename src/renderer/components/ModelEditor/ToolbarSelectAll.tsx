import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { ExpandOutlined } from '@ant-design/icons';
import actions from '../../services/model-editor/actions';

interface ToolbarSelectAllProps {
  graph: Graph;
}

const ToolbarSelectAll: React.FC<ToolbarSelectAllProps> = ({ graph }) => {
  /**
   * hooks
   */
  const handleSelectAll = () => {
    actions.selectAllAction(graph);
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="all"
      tooltip="Select all (ctrl/cmd + a)"
      icon={<ExpandOutlined />}
      onClick={handleSelectAll}
    />
  );
};

export default ToolbarSelectAll;
