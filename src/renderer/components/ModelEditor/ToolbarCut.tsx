import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { ScissorOutlined } from '@ant-design/icons';
import actions from '../../services/model-editor/actions';

interface ToolbarCutProps {
  graph: Graph;
}

const ToolbarCut: React.FC<ToolbarCutProps> = ({ graph }) => {
  /**
   * handlers
   */
  const handleCut = () => {
    actions.cutAction(graph);
  };
  
  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="cut"
      tooltip="Cut (ctrl/cmd + x)"
      icon={<ScissorOutlined />}
      onClick={handleCut}
    />
  );
};

export default ToolbarCut;
