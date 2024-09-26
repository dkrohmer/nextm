import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store';
import { setDataflowProtocol } from '../../store/modelEditor';

const DataflowModalProtocol: React.FC = () => {
  /**
   * global states
   */
  const { dataflowProtocol } = useSelector(
    (state: RootState) => state.modelEditor,
  );

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleProtocolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    if (value.length > 250) {
      value = value.slice(0, 249);
    }

    dispatch(setDataflowProtocol(value));
  };

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
