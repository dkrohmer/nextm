import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { DeleteOutlined } from '@ant-design/icons';
import { handleDelete } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarDeleteProps {
  graph: Graph;
}

const ToolbarDelete: React.FC<ToolbarDeleteProps> = ({ graph }) => {
  return (
    <Item
      name="delete"
      tooltip="Delete (backspace)"
      icon={<DeleteOutlined />}
      onClick={() => handleDelete(graph)}
    />
  );
};

export default ToolbarDelete;
