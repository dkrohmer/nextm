import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { IModel } from '../../interfaces/IModel';
import { handleSubmit } from '../../utils/modelsHandlers';

interface ModalSubmitButtonProps {
  modelsCurrentModel: IModel | null;
  modelsIsCloning: boolean;
  modelsIsEditing: boolean;
  incrementId: string | undefined;
}

const ModalSubmitButton: React.FC<ModalSubmitButtonProps> = ({
  modelsCurrentModel,
  modelsIsCloning,
  modelsIsEditing,
  incrementId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Form.Button
      primary
      type="submit"
      onClick={() =>
        handleSubmit(modelsCurrentModel, modelsIsCloning, incrementId, dispatch)
      }
    >
      {modelsIsCloning ? 'Clone' : modelsIsEditing ? 'Edit' : 'Add'}
    </Form.Button>
  );
};

export default ModalSubmitButton;
