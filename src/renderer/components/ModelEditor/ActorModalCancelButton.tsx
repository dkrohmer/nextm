import React from 'react';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleClose } from '../../utils/model-editor/actorModalHandlers';

interface ActorModalCancelButtonProps {
  dispatch: AppDispatch;
}

const ActorModalCancelButton: React.FC<ActorModalCancelButtonProps> = ({ dispatch }) => {
  return (
    <Form.Button onClick={() => handleClose(dispatch)}>
      Cancel
    </Form.Button>
  );
};

export default ActorModalCancelButton;
