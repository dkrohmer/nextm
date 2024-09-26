import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { CopyOutlined } from '@ant-design/icons';
import actions from '../../services/model-editor/actions';

interface ToolbarCopyProps {
  graph: Graph;
}

const ToolbarCopy: React.FC<ToolbarCopyProps> = ({ graph }) => {
  /**
   * handlers
   */
  const handleCopy = () => {
    actions.copyAction(graph);
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="copy"
      tooltip="Copy (ctrl/cmd + c)"
      icon={<CopyOutlined />}
      onClick={handleCopy}
    />
  );
};

export default ToolbarCopy;
