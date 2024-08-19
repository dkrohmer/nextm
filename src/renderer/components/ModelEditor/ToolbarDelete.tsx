import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { DeleteOutlined } from '@ant-design/icons';
import actions from '../../services/model-editor/actions';

interface ToolbarDeleteProps {
  graph: Graph;
}

const ToolbarDelete: React.FC<ToolbarDeleteProps> = ({ graph }) => {
  /**
   * handlers
   */
  const handleDelete = () => {
    actions.deleteAction(graph);
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="delete"
      tooltip="Delete (backspace)"
      icon={<DeleteOutlined />}
      onClick={handleDelete}
    />
  );
};

export default ToolbarDelete;
