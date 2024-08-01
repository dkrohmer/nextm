import React from 'react';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleSubmit } from '../../utils/incrementsHandlers';
import { IIncrement } from '../../interfaces/IIncrement';

interface ModalSubmitButtonProps {
  currentIncrement: IIncrement | null;
  incrementsIsCloning: boolean;
  productId: string | undefined;
  dispatch: AppDispatch;
  navigate: Function;
  submitButtonText: string;
}

const ModalSubmitButton: React.FC<ModalSubmitButtonProps> = ({
  currentIncrement,
  incrementsIsCloning,
  productId,
  dispatch,
  navigate,
  submitButtonText,
}) => (
  <Form.Button primary type="submit" onClick={() => handleSubmit(currentIncrement, incrementsIsCloning, productId, dispatch, navigate)}>
    {submitButtonText}
  </Form.Button>
);

export default ModalSubmitButton;
