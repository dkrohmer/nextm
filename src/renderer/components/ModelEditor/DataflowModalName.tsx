import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store';
import { handleDataflowModalLabelChange } from '../../utils/model-editor/dataflowModalHandlers';

const DataflowModalName: React.FC = () => {
  const dispatch = useDispatch();
  const { dataflowLabel } = useSelector((state: RootState) => state.modelEditor);

  return (
    <Form.Input
      label="Name"
      placeholder="Add label..."
      name="name"
      value={dataflowLabel}
      autoFocus
      required
      onChange={(event) => handleDataflowModalLabelChange(event, dispatch)}
    />
  );
};

export default DataflowModalName;
