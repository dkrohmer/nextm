import React from 'react';
import { useDispatch } from 'react-redux';
import { Toolbar } from '@antv/x6-react-components';
import { ExportOutlined } from '@ant-design/icons';
import { handleExport } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

const ToolbarExport: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Item
      name="export"
      tooltip="Export model (cmd + e)"
      icon={<ExportOutlined />}
      onClick={() => handleExport(dispatch)}
    />
  );
};

export default ToolbarExport;
