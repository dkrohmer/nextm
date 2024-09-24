import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { setZoneName } from '../../store/modelEditor';
import { RootState } from '../../store';

const ZoneModalName: React.FC = () => {
  /**
   * global states
   */
  const { zoneName } = useSelector((state: RootState) => state.modelEditor);


  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (value.length > 250) {
      value = value.slice(0, 249);
    }

    dispatch(setZoneName(value));
  };

  /**
   * tsx
   */
  return (
    <Form.Input
      label="Name"
      placeholder="Add zone name..."
      name="name"
      value={zoneName}
      autoFocus
      required
      onChange={handleNameChange}
    />
  );
};

export default ZoneModalName;
