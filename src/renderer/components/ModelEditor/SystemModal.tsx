import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { RootState, AppDispatch } from '../../store';
import { setSystemModalOpen } from '../../store/modelEditor';
import SystemModalName from './SystemModalName';
import SystemModalStack from './SystemModalStack';
import SystemModalDescription from './SystemModalDescription';
import SystemModalSubmitButton from './SystemModalSubmitButton';
import SystemModalCancelButton from './SystemModalCancelButton';
import system from '../../shapes/system';

interface SystemModalProps {
  graph: Graph;
}

const SystemModal: React.FC<SystemModalProps> = ({ graph }) => {
  /**
   * global states
   */
  const { 
    systemModalOpen,
    systemModalSelectedCell, 
    systemName, 
    systemStack, 
    systemDescription 
  } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (systemModalSelectedCell) {
      const cell = graph.getCellById(systemModalSelectedCell);
      if (cell.isNode()) {
        const attrs = system.setSystemAttrs(systemName, systemStack);
        cell.setAttrs(attrs);
        cell.setData({ description: systemDescription });
      }
      dispatch(setSystemModalOpen(false));
    }
  };

  const handleClose = () => {
    dispatch(setSystemModalOpen(false));
  };

  /**
   * tsx
   */
  return (
    <Modal open={systemModalOpen} onClose={handleClose} dimmer="blurring" data-testid="system-modal">
      <Modal.Header>Edit System</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit} data-testid="system-modal-form">
          <SystemModalName />
          <SystemModalStack />
          <SystemModalDescription />
          <Form.Group className="form-button-group">
            <SystemModalSubmitButton />
            <SystemModalCancelButton />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default SystemModal;
