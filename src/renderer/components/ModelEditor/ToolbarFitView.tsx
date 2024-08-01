import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { CompressOutlined } from '@ant-design/icons';
import { handleFitView } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarFitViewProps {
  graph: Graph;
}

const ToolbarFitView: React.FC<ToolbarFitViewProps> = ({ graph }) => {
  return (
    <Item
      name="fitView"
      tooltip="Fit View (cmd + whitespace)"
      icon={<CompressOutlined />}
      onClick={() => handleFitView(graph)}
    />
  );
};

export default ToolbarFitView;
