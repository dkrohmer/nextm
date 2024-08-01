import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { handleDataflowModalCancel } from '../../utils/model-editor/dataflowModalHandlers';

const DataflowModalCancelButton: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Form.Button type="button" onClick={() => handleDataflowModalCancel(dispatch)}>
      Cancel
    </Form.Button>
  );
};

export default DataflowModalCancelButton;
