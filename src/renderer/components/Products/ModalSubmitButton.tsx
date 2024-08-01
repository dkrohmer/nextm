import React from 'react';
import { Form } from 'semantic-ui-react';
import { handleSubmitButtonText } from '../../utils/productsHandlers';

interface ModalSubmitButtonProps {
  productsIsCloning: boolean;
  productsIsEditing: boolean;
}

const ModalSubmitButton: React.FC<ModalSubmitButtonProps> = ({
  productsIsCloning,
  productsIsEditing,
}) => (
  <Form.Button primary type="submit">
    {handleSubmitButtonText(productsIsCloning, productsIsEditing)}
  </Form.Button>
);

export default ModalSubmitButton;
