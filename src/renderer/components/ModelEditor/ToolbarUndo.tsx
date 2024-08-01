import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { UndoOutlined } from '@ant-design/icons';
import { handleUndo } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarUndoProps {
  graph: Graph;
  canUndo: boolean;
}

const ToolbarUndo: React.FC<ToolbarUndoProps> = ({ graph, canUndo }) => {
  return (
    <Item
      name="undo"
      tooltip="Undo (cmd + z)"
      icon={<UndoOutlined />}
      disabled={!canUndo}
      onClick={() => handleUndo(graph)}
    />
  );
};

export default ToolbarUndo;
