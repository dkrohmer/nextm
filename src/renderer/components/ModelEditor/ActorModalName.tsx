import React from 'react';
import { Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setActorName } from '../../store/modelEditor';

const ActorModalName: React.FC = () => {
  /**
   * global states
   */
  const { actorName } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    if (value.length > 250) {
      value = value.slice(0, 249);
    }

    dispatch(setActorName(value));
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
