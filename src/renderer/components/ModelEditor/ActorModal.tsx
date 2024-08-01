import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { handleSubmit, handleClose } from '../../utils/model-editor/actorModalHandlers'; // Import functions
import { RootState, AppDispatch } from '../../store';
import ActorModalName from './ActorModalName';
import ActorModalDescription from './ActorModalDescription';
import ActorModalSubmitButton from './ActorModalSubmitButton';
import ActorModalCancelButton from './ActorModalCancelButton';

interface ActorModalProps {
  graph: Graph;
}

const ActorModal: React.FC<ActorModalProps> = ({ graph }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { actorModalOpen, actorModalSelectedCell, actorName, actorDescription } = useSelector((state: RootState) => state.modelEditor);

  return (
    <Modal open={actorModalOpen} onClose={() => handleClose(dispatch)} dimmer="blurring">
      <Modal.Header>Edit Actor</Modal.Header>
      <Modal.Content>
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(graph, actorModalSelectedCell, actorName, actorDescription, dispatch);
        }}>
          <ActorModalName actorName={actorName} dispatch={dispatch} />
          <ActorModalDescription actorDescription={actorDescription} dispatch={dispatch} />
          <Form.Group className="form-button-group">
            <ActorModalSubmitButton />
            <ActorModalCancelButton dispatch={dispatch} />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ActorModal;
