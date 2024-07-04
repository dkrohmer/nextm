import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Graph } from '@antv/x6';

import { Form, Modal, TextAreaProps } from 'semantic-ui-react';
import Actor from '../shapes/actor';

import {
  setActorModalOpen,
  setActorName,
  setActorDescription,
} from '../../../store/ModelEditorStore';

import { RootState, AppDispatch } from '../../../store';

interface ActorModalProps {
  graph: Graph;
}

const ActorModal: React.FC<ActorModalProps> = ({ graph }) => {
  const dispatch = useDispatch<AppDispatch>();

  // global redux states
  const {
    actorModalOpen,
    actorModalSelectedCell,
    actorName,
    actorDescription,
  } = useSelector((state: RootState) => state.modelEditor);

  const handleSubmit = () => {
    if (actorModalSelectedCell) {
      const cell = graph.getCellById(actorModalSelectedCell);
      if (cell.isNode()) {
        const attrs = Actor.setActorAttrs(actorName);
        // todo: set Description
        cell.setAttrs(attrs);
        cell.setData({ description: actorDescription });
      }
      dispatch(setActorModalOpen(false));
    }
  };

  const handleClose = () => {
    dispatch(setActorModalOpen(false));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setActorName(event.target.value));
  };

  const handleDescriptionChange = (
    _e: React.ChangeEvent<HTMLTextAreaElement>,
    data: TextAreaProps,
  ) => {
    dispatch(setActorDescription(data.value as string));
  };

  return (
    <Modal open={actorModalOpen} onClose={handleClose} dimmer="blurring">
      <Modal.Header>Edit Actor</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Name"
            placeholder="Add actor name..."
            name="name"
            value={actorName}
            autoFocus
            required
            onChange={handleNameChange}
          />

          <Form.TextArea
            label="Description"
            placeholder="Description"
            value={actorDescription}
            onChange={handleDescriptionChange}
          />

          <Form.Group className="form-button-group">
            <Form.Button primary type="submit">
              Submit
            </Form.Button>
            <Form.Button onClick={handleClose}>Cancel</Form.Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ActorModal;
