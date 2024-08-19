import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { SnippetsOutlined } from '@ant-design/icons';
import actions from '../../services/model-editor/actions';

interface ToolbarPasteProps {
  graph: Graph;
}

const ToolbarPaste: React.FC<ToolbarPasteProps> = ({ graph }) => {
  /**
   * handlers
   */
  const handlePaste = () => {
    actions.pasteAction(graph);
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="paste"
      tooltip="Paste (ctrl/cmd + v)"
      icon={<SnippetsOutlined />}
      onClick={handlePaste}
    />
  );
};

export default ToolbarPaste;
