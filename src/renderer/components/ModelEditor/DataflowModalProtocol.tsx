import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store';
import { handleDataflowModalProtocolChange } from '../../utils/model-editor/dataflowModalHandlers';

const DataflowModalProtocol: React.FC = () => {
  const dispatch = useDispatch();
  const { dataflowProtocol } = useSelector((state: RootState) => state.modelEditor);

  return (
    <Form.Input
      label="Protocol"
      placeholder="Add protocol..."
      name="protocol"
      value={dataflowProtocol}
      onChange={(event) => handleDataflowModalProtocolChange(event, dispatch)}
    />
  );
};

export default DataflowModalProtocol;
