import React from 'react';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleClose } from '../../utils/model-editor/systemModalHandlers';

interface SystemModalCancelButtonProps {
  dispatch: AppDispatch;
}

const SystemModalCancelButton: React.FC<SystemModalCancelButtonProps> = ({ dispatch }) => {
  return (
    <Form.Button onClick={() => handleClose(dispatch)}>
      Cancel
    </Form.Button>
  );
};

export default SystemModalCancelButton;
