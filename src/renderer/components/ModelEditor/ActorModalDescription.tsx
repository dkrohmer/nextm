import React from 'react';
import { Form, TextAreaProps } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setActorDescription } from '../../store/modelEditor';

const ActorModalDescription: React.FC = () => {
  /**
   * global states
   */
  const { actorDescription } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleDescriptionChange = (data: TextAreaProps) => {
    dispatch(setActorDescription(data.value as string));
  };

  /**
   * tsx
   */
  return (
    <Form.TextArea
      label="Description"
      placeholder="Description"
      value={actorDescription}
      onChange={handleDescriptionChange}
    />
  );
};

export default ActorModalDescription;
