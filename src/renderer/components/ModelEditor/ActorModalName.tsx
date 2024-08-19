import React from 'react';
import { Form } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setActorName } from '../../store/modelEditor';

const ActorModalName: React.FC = () => {
  /**
   * global states
   */
  const { actorName } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>()

  /**
   * handlers
   */
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setActorName(event.target.value));
  };

  /**
   * tsx
   */
  return (
    <Form.Input
      label="Name"
      placeholder="Add actor name..."
      name="name"
      value={actorName}
      autoFocus
      required
      onChange={handleNameChange}
    />
  );
};

export default ActorModalName;
