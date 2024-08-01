import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { IModel } from '../../interfaces/IModel';
import { handleInputChange } from '../../utils/modelsHandlers';

interface ModalNameProps {
  modelsCurrentModel: IModel | null;
}

const ModalName: React.FC<ModalNameProps> = ({ modelsCurrentModel }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Form.Input
      label="Name"
      placeholder="Threat Model Name"
      value={modelsCurrentModel?.name || ''}
      autoFocus
      required
      onChange={(e) => handleInputChange(e, 'name', modelsCurrentModel, dispatch)}
    />
  );
};

export default ModalName;
