import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { setActorModalOpen } from '../../store/modelEditor';
import { RootState, AppDispatch } from '../../store';
import ActorModalName from './ActorModalName';
import ActorModalDescription from './ActorModalDescription';
import ActorModalSubmitButton from './ActorModalSubmitButton';
import ActorModalCancelButton from './ActorModalCancelButton';
import Actor from '../../shapes/actor';

interface ActorModalProps {
  graph: Graph;
}

const ActorModal: React.FC<ActorModalProps> = ({ graph }) => {
  /**
   * global states
   */
  const { 
    actorModalOpen, 
    actorModalSelectedCell, 
    actorName, 
    actorDescription 
  } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleSubmit = () => {
    if (actorModalSelectedCell) {
      const cell = graph.getCellById(actorModalSelectedCell);
      if (cell.isNode()) {
        const attrs = Actor.setActorAttrs(actorName);
        cell.setAttrs(attrs);
        cell.setData({ description: actorDescription });
      }
      dispatch(setActorModalOpen(false));
    }
  };

  const handleClose = () => {
    dispatch(setActorModalOpen(false));
  };

  /**
   * tsx
   */
  return (
    <Modal open={actorModalOpen} onClose={handleClose} dimmer="blurring" data-testid="actor-modal">
      <Modal.Header>Edit Actor</Modal.Header>
      <Modal.Content>
        <Form
          onSubmit={handleSubmit}
          data-testid="actor-modal-form"
        >
          <ActorModalName />
          <ActorModalDescription />
          <Form.Group className="form-button-group">
            <ActorModalSubmitButton />
            <ActorModalCancelButton />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ActorModal;
