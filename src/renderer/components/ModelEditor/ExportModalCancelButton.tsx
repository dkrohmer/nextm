import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { handleExportModalCancel } from '../../utils/model-editor/exportModalHandlers';

const ExportModalCancel: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Form.Button className="cancel-button" type="button" onClick={() => handleExportModalCancel(dispatch)}>
      Cancel
    </Form.Button>
  );
};

export default ExportModalCancel;
