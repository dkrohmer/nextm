import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, TextAreaProps } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { setSystemDescription } from '../../store/modelEditor';

const SystemModalDescription: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>()
  
  /**
   * global states
   */
  const { systemDescription } = useSelector((state: RootState) => state.modelEditor);
  
  /**
   * handlers
   */
  const handleDescriptionChange = (data: TextAreaProps) => {
    dispatch(setSystemDescription(data.value as string));
  };

  /**
   * tsx
   */
  return (
    <Form.TextArea
      label="Description"
      placeholder="Description"
      value={systemDescription}
      onChange={handleDescriptionChange}
    />
  );
};

export default SystemModalDescription;
