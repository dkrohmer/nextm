import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, TextAreaProps } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { setSystemDescription } from '../../store/modelEditor';

const SystemModalDescription: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * global states
   */
  const { systemDescription } = useSelector(
    (state: RootState) => state.modelEditor,
  );

  /**
   * handlers
   */
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    let { value } = e.target;

    if (value.length > 5000) {
      value = value.slice(0, 4999);
    }

    dispatch(setSystemDescription(value));
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
      data-testid="system-description"
    />
  );
};

export default SystemModalDescription;
