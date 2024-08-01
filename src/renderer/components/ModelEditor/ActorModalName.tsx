import React from 'react';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleNameChange } from '../../utils/model-editor/actorModalHandlers';

interface ActorModalNameProps {
  actorName: string;
  dispatch: AppDispatch;
}

const ActorModalName: React.FC<ActorModalNameProps> = ({ actorName, dispatch }) => {
  return (
    <Form.Input
      label="Name"
      placeholder="Add actor name..."
      name="name"
      value={actorName}
      autoFocus
      required
      onChange={(e) => handleNameChange(e, dispatch)}
    />
  );
};

export default ActorModalName;
