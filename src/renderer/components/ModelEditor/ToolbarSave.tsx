import React from 'react';
import { useDispatch } from 'react-redux';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { SaveOutlined } from '@ant-design/icons';
import { AppDispatch } from '../../store';
import { saveModel } from '../../utils/model-editor/saveModel';

const { Item } = Toolbar;

interface ToolbarSaveProps {
  graph: Graph;
  modelId: string | undefined;
  latestVersion: any;
}

const ToolbarSave: React.FC<ToolbarSaveProps> = ({ graph, modelId, latestVersion }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Item
      name="save"
      tooltip="Save model (cmd + s)"
      icon={<SaveOutlined />}
      onClick={() => saveModel(modelId, graph, latestVersion, dispatch)}
    />
  );
};

export default ToolbarSave;
