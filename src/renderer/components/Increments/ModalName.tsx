import React from 'react';
import { Form, InputOnChangeData } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIncrement } from '../../store/increments';

const ModalName: React.FC = () => {
  /**
   * global states
   */
  const { currentIncrement } = useSelector((state: RootState) => state.increments);
  
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleInputChange = (data: InputOnChangeData) => {
    if (currentIncrement) {
      dispatch(
        setCurrentIncrement({ ...currentIncrement, [data.name]: data.value }),
      );
    }
  };

  /**
   * tsx
   */
  return (
    <Form.Input
      label="Name"
      placeholder="Increment Name"
      name="name"
      value={currentIncrement?.name || ''}
      autoFocus
      required
      onChange={(_e, data) => handleInputChange(data)}
    />
  );
}

export default ModalName;