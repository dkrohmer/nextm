import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { handleDescriptionChange } from '../../utils/model-editor/zoneModalHandlers';

interface ZoneModalDescriptionProps {
  zoneDescription: string;
}

const ZoneModalDescription: React.FC<ZoneModalDescriptionProps> = ({ zoneDescription }) => {
  const dispatch = useDispatch();

  return (
    <Form.TextArea
      label="Description"
      placeholder="Description"
      value={zoneDescription}
      onChange={(e, data) => handleDescriptionChange(e, data, dispatch)}
    />
  );
};

export default ZoneModalDescription;
