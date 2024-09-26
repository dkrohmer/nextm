import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store';

const ModalSubmitButton: React.FC = () => {
  /**
   * global states
   */
  const { modelsIsEditing, modelsIsCloning } = useSelector(
    (state: RootState) => state.models,
  );

  /**
   * handlers
   */
  const handleSubmitButtonText = () =>
    modelsIsCloning ? 'Clone' : modelsIsEditing ? 'Edit' : 'Add';

  /**
   * tsx
   */
  return (
    <Form.Button primary type="submit">
      {handleSubmitButtonText()}
    </Form.Button>
  );
};

export default ModalSubmitButton;
