import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { handleSubmit, handleClose } from '../../utils/model-editor/systemModalHandlers';
import { RootState, AppDispatch } from '../../store';
import SystemModalName from './SystemModalName';
import SystemModalStack from './SystemModalStack';
import SystemModalDescription from './SystemModalDescription';
import SystemModalSubmitButton from './SystemModalSubmitButton';
import SystemModalCancelButton from './SystemModalCancelButton';

interface SystemModalProps {
  graph: Graph;
}

const SystemModal: React.FC<SystemModalProps> = ({ graph }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { systemModalOpen, systemModalSelectedCell, systemName, systemStack, systemDescription } = useSelector((state: RootState) => state.modelEditor);

  return (
    <Modal open={systemModalOpen} onClose={() => handleClose(dispatch)} dimmer="blurring">
      <Modal.Header>Edit System</Modal.Header>
      <Modal.Content>
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(graph, systemModalSelectedCell, systemName, systemStack, systemDescription, dispatch);
        }}>
          <SystemModalName systemName={systemName} dispatch={dispatch} />
          <SystemModalStack systemStack={systemStack} dispatch={dispatch} />
          <SystemModalDescription systemDescription={systemDescription} dispatch={dispatch} />
          <Form.Group className="form-button-group">
            <SystemModalSubmitButton />
            <SystemModalCancelButton dispatch={dispatch} />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default SystemModal;
