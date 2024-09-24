import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { setSystemName } from '../../store/modelEditor';

const SystemModalName: React.FC = () => {
  /**
   * global states
   */
  const { systemName } = useSelector((state: RootState) => state.modelEditor);
  
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>()

  /**
   * handlers
   */
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (value.length > 250) {
      value = value.slice(0, 249);
    }

    dispatch(setSystemName(value));
  };
  
  /**
   * tsx
   */
  return (
    <Form.Input
      label="Name"
      placeholder="Add system name..."
      name="name"
      value={systemName}
      autoFocus
      required
      onChange={handleNameChange}
    />
  );
};

export default SystemModalName;
