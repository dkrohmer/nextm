import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { RootState } from '../../store';
import { setDataflowModalOpen } from '../../store/modelEditor';
import DataflowModalName from './DataflowModalName';
import DataflowModalProtocol from './DataflowModalProtocol';
import DataflowModalStride from './DataflowModalStride';
import DataflowModalSubmitButton from './DataflowModalSubmitButton';
import DataflowModalCancelButton from './DataflowModalCancelButton';

interface DataflowModalProps {
  graph: Graph;
}

const DataflowModal: React.FC<DataflowModalProps> = ({ graph }) => {
  const dispatch = useDispatch();
  const { dataflowModalOpen } = useSelector((state: RootState) => state.modelEditor);

  return (
    <Modal
      open={dataflowModalOpen}
      onClose={() => dispatch(setDataflowModalOpen(false))}
      dimmer="blurring"
    >
      <Modal.Header>Edit Dataflow</Modal.Header>
      <Modal.Content>
        <Form>
          <DataflowModalName />
          <DataflowModalProtocol />
          <DataflowModalStride />
          <Form.Group className="form-button-group">
            <DataflowModalSubmitButton graph={graph} />
            <DataflowModalCancelButton />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default DataflowModal;
