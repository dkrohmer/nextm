import React from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { handleSaveAndCloseSubmit } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

interface ToolbarSaveAndCloseProps {
  graph: Graph;
  modelId: string | undefined;
  latestVersion: any;
  navigate: (path: string) => void;
  productId: string | undefined;
  incrementId: string | undefined;
}

const ToolbarSaveAndClose: React.FC<ToolbarSaveAndCloseProps> = ({
  graph,
  modelId,
  latestVersion,
  navigate,
  productId,
  incrementId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Item
      className="save-and-close-button"
      name="saveandclose"
      tooltip="Save and Close Threat Model Editor"
      icon={<CloseOutlined />}
      onClick={() => handleSaveAndCloseSubmit(graph, modelId, latestVersion, dispatch, navigate, productId, incrementId)}
    />
  );
};

export default ToolbarSaveAndClose;
