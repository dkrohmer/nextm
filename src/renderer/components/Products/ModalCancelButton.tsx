import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleClose } from '../../utils/productsHandlers';

const ModalCancelButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Form.Button className="products-modal-cancel-button" onClick={() => handleClose(dispatch)}>
      Cancel
    </Form.Button>
  );
};

export default ModalCancelButton;
