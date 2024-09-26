import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store';

const ModalSubmitButton: React.FC = () => {
  /**
   * global states
   */
  const { incrementsIsEditing, incrementsIsCloning } = useSelector(
    (state: RootState) => state.increments,
  );

  /**
   * handlers
   */
  const handleSubmitButtonText = () =>
    incrementsIsCloning ? 'Clone' : incrementsIsEditing ? 'Edit' : 'Add';

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
