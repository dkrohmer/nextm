import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { SaveOutlined } from '@ant-design/icons';
import { AppDispatch, RootState } from '../../store';
import { saveModel } from '../../utils/saveModel';

interface CustomToolbarProps {
  graph: Graph;
}

const ToolbarSave: React.FC<CustomToolbarProps> = ({ graph }) => {
  /**
   * global states
   */
  const { latestVersion } = useSelector((state: RootState) => state.versions);

  /**
   * hooks
   */
  const { modelId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleSave = () => {
    saveModel(modelId, graph, latestVersion, dispatch);
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="save"
      tooltip="Save model (cmd + s)"
      icon={<SaveOutlined />}
      onClick={handleSave}
    />
  );
};

export default ToolbarSave;
