import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store';
import { setDataflowProtocol } from '../../store/modelEditor';

const DataflowModalProtocol: React.FC = () => {
  /**
   * global states
   */
  const { dataflowProtocol } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleProtocolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDataflowProtocol(event.target.value));
  }

  /**
   * tsx
   */
  return (
    <Form.Input
      label="Protocol"
      placeholder="Add protocol..."
      name="protocol"
      value={dataflowProtocol}
      onChange={handleProtocolChange}
    />
  );
};

export default DataflowModalProtocol;
