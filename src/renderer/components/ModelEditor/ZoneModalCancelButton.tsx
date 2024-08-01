import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { handleClose } from '../../utils/model-editor/zoneModalHandlers';

const ZoneModalCancelButton: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Form.Button onClick={() => handleClose(dispatch)}>
      Cancel
    </Form.Button>
  );
};

export default ZoneModalCancelButton;
