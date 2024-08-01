import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { RedoOutlined } from '@ant-design/icons';
import { handleRedo } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarRedoProps {
  graph: Graph;
  canRedo: boolean;
}

const ToolbarRedo: React.FC<ToolbarRedoProps> = ({ graph, canRedo }) => {
  return (
    <Item
      name="redo"
      tooltip="Redo (cmd + shift + z)"
      icon={<RedoOutlined />}
      disabled={!canRedo}
      onClick={() => handleRedo(graph)}
    />
  );
};

export default ToolbarRedo;
