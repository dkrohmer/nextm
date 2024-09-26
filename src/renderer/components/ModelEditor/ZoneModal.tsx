import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { RootState, AppDispatch } from '../../store';
import { setZoneModalOpen } from '../../store/modelEditor';
import ZoneModalName from './ZoneModalName';
import ZoneModalTrustLevel from './ZoneModalTrustLevel';
import ZoneModalDescription from './ZoneModalDescription';
import ZoneModalSubmitButton from './ZoneModalSubmitButton';
import ZoneModalCancelButton from './ZoneModalCancelButton';
import zone from '../../shapes/zone';

interface ZoneModalProps {
  graph: Graph;
}

const ZoneModal: React.FC<ZoneModalProps> = ({ graph }) => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * global states
   */
  const {
    zoneModalOpen,
    zoneModalSelectedCell,
    zoneName,
    zoneTrustLevel,
    zoneDescription,
  } = useSelector((state: RootState) => state.modelEditor);

  /**
   * handlers
   */
  const handleSubmit = () => {
    if (zoneModalSelectedCell) {
      const cell = graph.getCellById(zoneModalSelectedCell);
      if (cell.isNode()) {
        const attrs = zone.setZoneAttrs(zoneName, zoneTrustLevel);
        cell.setAttrs(attrs);
        cell.setData({ description: zoneDescription });
      }
      dispatch(setZoneModalOpen(false));
    }
  };

  const handleClose = () => {
    dispatch(setZoneModalOpen(false));
  };

  /**
   * tsx
   */
  return (
    <Modal
      open={zoneModalOpen}
      onClose={handleClose}
      dimmer="blurring"
      data-testid="zone-modal"
    >
      <Modal.Header>Edit Zone</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit} data-testid="zone-modal-form">
          <ZoneModalName />
          <ZoneModalTrustLevel />
          <ZoneModalDescription />
          <Form.Group className="form-button-group">
            <ZoneModalSubmitButton />
            <ZoneModalCancelButton />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ZoneModal;
