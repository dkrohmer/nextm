import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { setSystemModalOpen } from '../../store/modelEditor';

const SystemModalCancelButton: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>()
  
  /**
   * handlers
   */
  const handleClose = () => {
    dispatch(setSystemModalOpen(false));
  };
  
  /**
   * tsx
   */
  return (
    <Form.Button onClick={() => handleClose}>
      Cancel
    </Form.Button>
  );
};

export default SystemModalCancelButton;
