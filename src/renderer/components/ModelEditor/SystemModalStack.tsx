import React from 'react';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleStackChange } from '../../utils/model-editor/systemModalHandlers';

interface SystemModalStackProps {
  systemStack: string;
  dispatch: AppDispatch;
}

const SystemModalStack: React.FC<SystemModalStackProps> = ({ systemStack, dispatch }) => {
  return (
    <Form.Input
      label="Stack"
      placeholder="Add system stack..."
      name="stack"
      value={systemStack}
      onChange={(e) => handleStackChange(e, dispatch)}
    />
  );
};

export default SystemModalStack;
