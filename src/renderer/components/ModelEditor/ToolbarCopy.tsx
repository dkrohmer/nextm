import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { CopyOutlined } from '@ant-design/icons';
import { handleCopy } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarCopyProps {
  graph: Graph;
}

const ToolbarCopy: React.FC<ToolbarCopyProps> = ({ graph }) => {
  return (
    <Item
      name="copy"
      tooltip="Copy (ctrl/cmd + c)"
      icon={<CopyOutlined />}
      onClick={() => handleCopy(graph)}
    />
  );
};

export default ToolbarCopy;
