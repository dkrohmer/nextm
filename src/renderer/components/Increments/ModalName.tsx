import React from 'react';
import { Form } from 'semantic-ui-react';
import { IIncrement } from '../../interfaces/IIncrement';
import { AppDispatch } from '../../store';
import { handleInputChange } from '../../utils/incrementsHandlers';

interface ModalNameProps {
  currentIncrement: IIncrement | null;
  dispatch: AppDispatch;
}

const ModalName: React.FC<ModalNameProps> = ({ currentIncrement, dispatch }) => (
  <Form.Input
    label="Name"
    placeholder="Increment Name"
    name="name"
    value={currentIncrement?.name || ''}
    autoFocus
    required
    onChange={(e, data) => handleInputChange(data, currentIncrement, dispatch)}
  />
);

export default ModalName;
