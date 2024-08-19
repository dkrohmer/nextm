import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { setExportModalOpen } from '../../store/modelEditor';

const ExportModalCancel: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleClose = () => {
    dispatch(setExportModalOpen(false));
  } 

  /**
   * tsx
   */
  return (
    <Form.Button className="cancel-button" type="button" onClick={handleClose}>
      Cancel
    </Form.Button>
  );
};

export default ExportModalCancel;
