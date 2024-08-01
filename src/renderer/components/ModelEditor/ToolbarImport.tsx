import React from 'react';
import { useDispatch } from 'react-redux';
import { Toolbar } from '@antv/x6-react-components';
import { ImportOutlined } from '@ant-design/icons';
import { handleImport } from '../../utils/model-editor/toolbarHandlers';

const { Item } = Toolbar;

const ToolbarImport: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Item
      name="import"
      tooltip="Import model (cmd + i)"
      icon={<ImportOutlined />}
      onClick={() => handleImport(dispatch)}
    />
  );
};

export default ToolbarImport;
