import React from 'react';
import { useDispatch } from 'react-redux';
import { Toolbar } from '@antv/x6-react-components';
import { ImportOutlined } from '@ant-design/icons';
import { setImportModalOpen } from '../../store/modelEditor';

const ToolbarImport: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleImport = () => {
    dispatch(setImportModalOpen(true));
  };

  /**
   * tsx
   */
  return (
    <Toolbar.Item
      name="import"
      tooltip="Import model (cmd + i)"
      icon={<ImportOutlined />}
      onClick={handleImport}
    />
  );
};

export default ToolbarImport;
