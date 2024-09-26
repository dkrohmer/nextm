import React from 'react';
import { useDispatch } from 'react-redux';
import { Toolbar } from '@antv/x6-react-components';
import { ExportOutlined } from '@ant-design/icons';
import { AppDispatch } from '../../store';
import { setExportModalOpen } from '../../store/modelEditor';

const ToolbarExport: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleExport = () => {
    dispatch(setExportModalOpen(true));
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="export"
      tooltip="Export model (cmd + e)"
      icon={<ExportOutlined />}
      onClick={handleExport}
    />
  );
};

export default ToolbarExport;
