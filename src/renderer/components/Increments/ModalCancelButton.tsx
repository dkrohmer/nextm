import React from 'react';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleClose } from '../../utils/incrementsHandlers';

interface ModalCancelButtonProps {
  dispatch: AppDispatch;
}

const ModalCancelButton: React.FC<ModalCancelButtonProps> = ({ dispatch }) => (
  <Form.Button onClick={() => handleClose(dispatch)}>Cancel</Form.Button>
);

export default ModalCancelButton;
