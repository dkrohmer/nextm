import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Graph } from '@antv/x6';

import { Form, Modal, TextAreaProps } from 'semantic-ui-react';
import System from '../shapes/system';

import {
  setSystemDescription,
  setSystemModalOpen,
  setSystemName,
  setSystemStack,
} from '../../../store/ModelEditorStore';

import { RootState, AppDispatch } from '../../../store';

interface SystemModalProps {
  graph: Graph;
}

const SystemModal: React.FC<SystemModalProps> = ({ graph }) => {
  const dispatch = useDispatch<AppDispatch>();

  // global redux states
  const {
    systemModalOpen,
    systemModalSelectedCell,
    systemName,
    systemStack,
    systemDescription,
    // textModeInputValue,
    // textModeSelectedCell,
  } = useSelector((state: RootState) => state.modelEditor);

  const handleSubmit = () => {
    if (systemModalSelectedCell) {
      const cell = graph.getCellById(systemModalSelectedCell);
      if (cell.isNode()) {
        const attrs = System.setSystemAttrs(systemName, systemStack);
        // todo: set Description
        cell.setAttrs(attrs);
        cell.setData({ description: systemDescription });
      }
      dispatch(setSystemModalOpen(false));
    }
  };

  const handleClose = () => {
    dispatch(setSystemModalOpen(false));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSystemName(event.target.value));
  };

  const handleStackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSystemStack(event.target.value));
  };

  const handleDescriptionChange = (
    _e: React.ChangeEvent<HTMLTextAreaElement>,
    data: TextAreaProps,
  ) => {
    dispatch(setSystemDescription(data.value as string));
  };

  return (
    <Modal open={systemModalOpen} onClose={handleClose} dimmer="blurring">
      <Modal.Header>Edit System</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Name"
            placeholder="Add system name..."
            name="name"
            value={systemName}
            autoFocus
            required
            onChange={handleNameChange}
          />

          <Form.Input
            label="Stack"
            placeholder="Add system name..."
            name="name"
            value={systemStack}
            onChange={handleStackChange}
          />

          <Form.TextArea
            label="Description"
            placeholder="Description"
            value={systemDescription}
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

export default SystemModal;
