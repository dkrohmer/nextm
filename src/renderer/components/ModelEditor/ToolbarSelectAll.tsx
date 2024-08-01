import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { ExpandOutlined } from '@ant-design/icons';
import { handleSelectAll } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarSelectAllProps {
  graph: Graph;
}

const ToolbarSelectAll: React.FC<ToolbarSelectAllProps> = ({ graph }) => {
  return (
    <Item
      name="all"
      tooltip="Select all (ctrl/cmd + a)"
      icon={<ExpandOutlined />}
      onClick={() => handleSelectAll(graph)}
    />
  );
};

export default ToolbarSelectAll;
