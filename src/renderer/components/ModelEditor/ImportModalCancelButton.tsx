import React from 'react';
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  setImportError,
  setImportFileName,
  setImportIsFileValid,
  setImportJsonData,
  setImportModalOpen,
} from '../../store/modelEditor';

const ImportModalCancelButton: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleClose = () => {
    dispatch(setImportModalOpen(false));
    dispatch(setImportFileName(null));
    dispatch(setImportJsonData(null));
    dispatch(setImportError(null));
    dispatch(setImportIsFileValid(false));
  };

  /**
   * tsx
   */
  return (
    <Form.Button className="cancel-button" onClick={handleClose}>
      Cancel
    </Form.Button>
  );
};

export default ImportModalCancelButton;
