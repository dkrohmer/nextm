import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { setModelsCurrentModel } from '../../store/models';

const ModalName: React.FC = () => {
  /**
   * global states
   */
  const { modelsCurrentModel } = useSelector(
    (state: RootState) => state.models,
  );

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    let { value } = e.target;

    if (value.length > 250) {
      value = value.slice(0, 249);
    }

    if (modelsCurrentModel) {
      dispatch(setModelsCurrentModel({ ...modelsCurrentModel, [key]: value }));
    }
  };

  /**
   * tsx
   */
  return (
    <Form.Input
      label="Name"
      placeholder="Threat Model Name"
      value={modelsCurrentModel?.name || ''}
      autoFocus
      required
      onChange={(e) => handleInputChange(e, 'name')}
    />
  );
};

export default ModalName;
