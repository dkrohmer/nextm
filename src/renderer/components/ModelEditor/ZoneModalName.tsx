import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { handleNameChange } from '../../utils/model-editor/zoneModalHandlers';

interface ZoneModalNameProps {
  zoneName: string;
}

const ZoneModalName: React.FC<ZoneModalNameProps> = ({ zoneName }) => {
  const dispatch = useDispatch();

  return (
    <Form.Input
      label="Name"
      placeholder="Add zone name..."
      name="name"
      value={zoneName}
      autoFocus
      required
      onChange={(e) => handleNameChange(e, dispatch)}
    />
  );
};

export default ZoneModalName;
