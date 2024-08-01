import React from 'react';
import { Form, TextAreaProps } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleDescriptionChange } from '../../utils/model-editor/actorModalHandlers';

interface ActorModalDescriptionProps {
  actorDescription: string;
  dispatch: AppDispatch;
}

const ActorModalDescription: React.FC<ActorModalDescriptionProps> = ({ actorDescription, dispatch }) => {
  return (
    <Form.TextArea
      label="Description"
      placeholder="Description"
      value={actorDescription}
      onChange={(e, data) => handleDescriptionChange(e, data as TextAreaProps, dispatch)}
    />
  );
};

export default ActorModalDescription;
