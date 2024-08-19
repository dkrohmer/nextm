import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { setActorModalOpen } from '../../store/modelEditor';

const ActorModalCancelButton: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>()
  
  /**
   * handlers
   */
  const handleClose = () => {
    dispatch(setActorModalOpen(false));
  };

  /**
   * tsx
   */
  return (
    <Form.Button onClose={handleClose}>
      Cancel
    </Form.Button>
  );
};

export default ActorModalCancelButton;
