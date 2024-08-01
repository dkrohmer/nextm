import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { ScissorOutlined } from '@ant-design/icons';
import { handleCut } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarCutProps {
  graph: Graph;
}

const ToolbarCut: React.FC<ToolbarCutProps> = ({ graph }) => {
  return (
    <Item
      name="cut"
      tooltip="Cut (ctrl/cmd + x)"
      icon={<ScissorOutlined />}
      onClick={() => handleCut(graph)}
    />
  );
};

export default ToolbarCut;
