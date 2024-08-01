import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { RootState } from '../../store';
import { handleDataflowModalSubmit } from '../../utils/model-editor/dataflowModalHandlers';

interface DataflowModalSubmitButtonProps {
  graph: Graph;
}

const DataflowModalSubmitButton: React.FC<DataflowModalSubmitButtonProps> = ({ graph }) => {
  const dispatch = useDispatch();
  const {
    dataflowLabel,
    dataflowProtocol,
    dataflowModalSelectedCell,
    dataflowStride,
  } = useSelector((state: RootState) => state.modelEditor);

  return (
    <Form.Button primary type="button" onClick={() => handleDataflowModalSubmit(graph, dataflowModalSelectedCell, dataflowLabel, dataflowProtocol, dataflowStride, dispatch)}>
      Submit
    </Form.Button>
  );
};

export default DataflowModalSubmitButton;
