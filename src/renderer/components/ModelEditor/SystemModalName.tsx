import React from 'react';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleNameChange } from '../../utils/model-editor/systemModalHandlers';

interface SystemModalNameProps {
  systemName: string;
  dispatch: AppDispatch;
}

const SystemModalName: React.FC<SystemModalNameProps> = ({ systemName, dispatch }) => {
  return (
    <Form.Input
      label="Name"
      placeholder="Add system name..."
      name="name"
      value={systemName}
      autoFocus
      required
      onChange={(e) => handleNameChange(e, dispatch)}
    />
  );
};

export default SystemModalName;
