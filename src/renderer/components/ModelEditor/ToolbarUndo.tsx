import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { UndoOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import actions from '../../services/model-editor/actions';

interface ToolbarUndoProps {
  graph: Graph;
}

const ToolbarUndo: React.FC<ToolbarUndoProps> = ({ graph }) => {
  /**
   * global states
   */
  const { canUndo } = useSelector((state: RootState) => state.modelEditor);

  /**
   * handlers
   */
  const handleUndo = () => {
    actions.undoAction(graph);
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="undo"
      tooltip="Undo (cmd + z)"
      icon={<UndoOutlined />}
      disabled={!canUndo}
      onClick={handleUndo}
    />
  );
};

export default ToolbarUndo;
