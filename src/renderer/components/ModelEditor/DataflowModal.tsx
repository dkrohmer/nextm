import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { RootState } from '../../store';
import { DataflowStride, setDataflowModalOpen } from '../../store/modelEditor';
import DataflowModalName from './DataflowModalLabel';
import DataflowModalProtocol from './DataflowModalProtocol';
import DataflowModalStride from './DataflowModalStride';
import DataflowModalSubmitButton from './DataflowModalSubmitButton';
import DataflowModalCancelButton from './DataflowModalCancelButton';
import dataflow from '../../shapes/dataflow';

interface DataflowModalProps {
  graph: Graph;
}

const DataflowModal: React.FC<DataflowModalProps> = ({ graph }) => {
  /**
   * global states
   */
  const { 
    dataflowModalOpen, 
    dataflowModalSelectedCell, 
    dataflowStride, 
    dataflowLabel, 
    dataflowProtocol 
  } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleSubmit = () => {
    if (dataflowModalSelectedCell) {
      const cell = graph.getCellById(dataflowModalSelectedCell);
      if (cell.isEdge()) {
        const strideString = (Object.keys(dataflowStride) as Array<keyof DataflowStride>)
          .filter((key) => dataflowStride[key])
          .map((key) => key.charAt(0).toUpperCase())
          .join(' ');
        const label = dataflow.setDataflowLabel(dataflowLabel, dataflowProtocol, strideString);
        cell.setLabelAt(0, label);
      }
      dispatch(setDataflowModalOpen(false));
    }
  }

  const handleCancel = () => {
    dispatch(setDataflowModalOpen(false));
  }

  /**
   * tsx
   */
  return (
    <Modal open={dataflowModalOpen} onClose={handleCancel} dimmer="blurring">
      <Modal.Header>Edit Dataflow</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <DataflowModalName />
          <DataflowModalProtocol />
          <DataflowModalStride />
          <Form.Group className="form-button-group">
            <DataflowModalSubmitButton />
            <DataflowModalCancelButton />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default DataflowModal;
