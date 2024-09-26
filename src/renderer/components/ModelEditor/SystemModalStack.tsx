import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { setSystemStack } from '../../store/modelEditor';

const SystemModalStack: React.FC = () => {
  /**
   * global states
   */
  const { systemStack } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleStackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    if (value.length > 250) {
      value = value.slice(0, 249);
    }

    dispatch(setSystemStack(value));
  };

  /**
   * tsx
   */
  return (
    <Form.Input
      label="Stack"
      placeholder="Add system stack..."
      name="stack"
      value={systemStack}
      onChange={handleStackChange}
    />
  );
};

export default SystemModalStack;
