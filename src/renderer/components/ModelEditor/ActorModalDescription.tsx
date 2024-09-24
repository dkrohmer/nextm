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
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;

    if (value.length > 5000) {
      value = value.slice(0, 4999);
    }

    dispatch(setActorDescription(value));
  };

  /**
   * tsx
   */
  return (
    <Form.TextArea
      data-testid="actor-description"
      label="Description"
      placeholder="Description"
      value={actorDescription}
      onChange={handleDescriptionChange}
    />
  );
};

export default ActorModalDescription;
