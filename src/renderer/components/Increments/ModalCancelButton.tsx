import React from 'react';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { setCurrentIncrement, setIncrementsIsCloning, setIncrementsIsEditing, setIncrementsModalOpen } from '../../store/increments';

const ModalCancelButton: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleClose = () => {
    dispatch(setIncrementsModalOpen(false));
    dispatch(setCurrentIncrement(null));
    dispatch(setIncrementsIsCloning(false));
    dispatch(setIncrementsIsEditing(false));
  };

  /**
   * tsx
   */
  return (
    <Form.Button onClick={handleClose}>
      Cancel
    </Form.Button>
  )
}

export default ModalCancelButton;
