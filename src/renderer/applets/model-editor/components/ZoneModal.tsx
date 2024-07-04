import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Graph } from '@antv/x6';

import { Form, Modal, Radio, TextAreaProps } from 'semantic-ui-react';
import Zone from '../shapes/zone';

import {
  setZoneModalOpen,
  setZoneName,
  setZoneTrustLevel,
  setZoneDescription,
} from '../../../store/ModelEditorStore';

import { RootState, AppDispatch } from '../../../store';

interface ZoneModalProps {
  graph: Graph;
}

const ZoneModal: React.FC<ZoneModalProps> = ({ graph }) => {
  const dispatch = useDispatch<AppDispatch>();

  // global redux states
  const {
    zoneModalOpen,
    zoneModalSelectedCell,
    zoneName,
    zoneTrustLevel,
    zoneDescription,
  } = useSelector((state: RootState) => state.modelEditor);

  const handleSubmit = () => {
    if (zoneModalSelectedCell) {
      const cell = graph.getCellById(zoneModalSelectedCell);
      if (cell.isNode()) {
        const attrs = Zone.setZoneAttrs(zoneName, zoneTrustLevel);
        cell.setAttrs(attrs);
        cell.setData({ description: zoneDescription });
      }
      dispatch(setZoneModalOpen(false));
    }
  };

  const handleClose = () => {
    dispatch(setZoneModalOpen(false));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setZoneName(event.target.value));
  };

  const handleTrustLevelChange = (value: string) => {
    dispatch(setZoneTrustLevel(value));
  };

  const handleDescriptionChange = (
    _e: React.ChangeEvent<HTMLTextAreaElement>,
    data: TextAreaProps,
  ) => {
    dispatch(setZoneDescription(data.value as string));
  };

  return (
    <Modal open={zoneModalOpen} onClose={handleClose} dimmer="blurring">
      <Modal.Header>Edit Zone</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Name"
            placeholder="Add zone name..."
            name="name"
            value={zoneName}
            autoFocus
            required
            onChange={handleNameChange}
          />

          <div className="field">
            <label>Trust level</label>
            <Form.Group inline>
              <Form.Field>
                <Radio
                  label="n/a"
                  name="radioGroup"
                  value=""
                  checked={zoneTrustLevel === ''}
                  onChange={() => handleTrustLevelChange('')}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Untrusted"
                  name="radioGroup"
                  value="untrusted"
                  checked={zoneTrustLevel === 'untrusted'}
                  onChange={() => handleTrustLevelChange('untrusted')}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Trusted"
                  name="radioGroup"
                  value="trusted"
                  checked={zoneTrustLevel === 'trusted'}
                  onChange={() => handleTrustLevelChange('trusted')}
                />
              </Form.Field>
            </Form.Group>
          </div>

          <Form.TextArea
            label="Description"
            placeholder="Description"
            value={zoneDescription}
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

export default ZoneModal;
