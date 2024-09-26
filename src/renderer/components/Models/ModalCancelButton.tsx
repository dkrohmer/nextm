import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import {
  setModelsCurrentModel,
  setModelsIsCloning,
  setModelsIsEditing,
  setModelsModalOpen,
} from '../../store/models';

const ModalCancelButton: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleClose = () => {
    dispatch(setModelsModalOpen(false));
    dispatch(setModelsCurrentModel(null));
    dispatch(setModelsIsEditing(false));
    dispatch(setModelsIsCloning(false));
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

export default ModalCancelButton;
