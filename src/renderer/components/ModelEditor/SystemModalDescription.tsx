import React from 'react';
import { Form, TextAreaProps } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleDescriptionChange } from '../../utils/model-editor/systemModalHandlers';

interface SystemModalDescriptionProps {
  systemDescription: string;
  dispatch: AppDispatch;
}

const SystemModalDescription: React.FC<SystemModalDescriptionProps> = ({ systemDescription, dispatch }) => {
  return (
    <Form.TextArea
      label="Description"
      placeholder="Description"
      value={systemDescription}
      onChange={(e, data) => handleDescriptionChange(e, data as TextAreaProps, dispatch)}
    />
  );
};

export default SystemModalDescription;
