import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { SnippetsOutlined } from '@ant-design/icons';
import { handlePaste } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarPasteProps {
  graph: Graph;
}

const ToolbarPaste: React.FC<ToolbarPasteProps> = ({ graph }) => {
  return (
    <Item
      name="paste"
      tooltip="Paste (ctrl/cmd + v)"
      icon={<SnippetsOutlined />}
      onClick={() => handlePaste(graph)}
    />
  );
};

export default ToolbarPaste;
