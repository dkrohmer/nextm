import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store';

const ModalSubmitButton: React.FC = () => {
  /**
   * global states
   */
  const { productsIsCloning, productsIsEditing } = useSelector(
    (state: RootState) => state.products,
  );

  /**
   * handlers
   */
  const handleSubmitButtonText = () => {
    return productsIsCloning ? 'Clone' : productsIsEditing ? 'Edit' : 'Add';
  };

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
