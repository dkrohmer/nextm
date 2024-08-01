import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { handleSubmit, handleClose } from '../../utils/model-editor/zoneModalHandlers';
import { RootState, AppDispatch } from '../../store';
import ZoneModalName from './ZoneModalName';
import ZoneModalTrustLevel from './ZoneModalTrustLevel';
import ZoneModalDescription from './ZoneModalDescription';
import ZoneModalSubmitButton from './ZoneModalSubmitButton';
import ZoneModalCancelButton from './ZoneModalCancelButton';

interface ZoneModalProps {
  graph: Graph;
}

const ZoneModal: React.FC<ZoneModalProps> = ({ graph }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { zoneModalOpen, zoneModalSelectedCell, zoneName, zoneTrustLevel, zoneDescription } = useSelector((state: RootState) => state.modelEditor);

  return (
    <Modal open={zoneModalOpen} onClose={() => handleClose(dispatch)} dimmer="blurring">
      <Modal.Header>Edit Zone</Modal.Header>
      <Modal.Content>
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(graph, zoneModalSelectedCell, zoneName, zoneTrustLevel, zoneDescription, dispatch);
        }}>
          <ZoneModalName zoneName={zoneName} />
          <ZoneModalTrustLevel zoneTrustLevel={zoneTrustLevel} />
          <ZoneModalDescription zoneDescription={zoneDescription} />
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
