import React from 'react';
import { useSelector } from 'react-redux';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { RedoOutlined } from '@ant-design/icons';
import { RootState } from '../../store';
import actions from '../../services/model-editor/actions';

interface ToolbarRedoProps {
  graph: Graph;
}

const ToolbarRedo: React.FC<ToolbarRedoProps> = ({ graph }) => {
  /**
   * global states
   */
  const { canRedo } = useSelector((state: RootState) => state.modelEditor);

  /**
   * handlers
   */
  const handleRedo = () => {
    actions.redoAction(graph);
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="redo"
      tooltip="Redo (cmd + shift + z)"
      icon={<RedoOutlined />}
      disabled={!canRedo}
      onClick={handleRedo}
    />
  );
};

export default ToolbarRedo;
