import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { saveModel } from '../../utils/saveModel';

interface ToolbarSaveAndCloseProps {
  graph: Graph;
}

const ToolbarSaveAndClose: React.FC<ToolbarSaveAndCloseProps> = ({ graph }) => {
  /**
   * global states
   */
  const { latestVersion } = useSelector((state: RootState) => state.versions);

  /**
   * hooks
   */
  const { productId, incrementId, modelId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /**
   * handlers
   */
  const handleSaveAndCloseSubmit = async () => {
    await saveModel(modelId, graph, latestVersion, dispatch);
    navigate(`/products/${productId}/increments/${incrementId}`);
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      className="save-and-close-button"
      name="saveandclose"
      tooltip="Save and Close Threat Model Editor"
      icon={<CloseOutlined />}
      onClick={handleSaveAndCloseSubmit}
    />
  );
};

export default ToolbarSaveAndClose;
