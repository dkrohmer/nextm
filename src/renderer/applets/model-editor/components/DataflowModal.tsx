import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Graph } from '@antv/x6';
import { Checkbox, Form, Modal } from 'semantic-ui-react';
import type { DataflowStride } from '../../../store/ModelEditorStore';
import Dataflow from '../shapes/dataflow';

import {
  // setTextMode,
  setDataflowModalOpen,
  setDataflowLabel,
  setDataflowProtocol,
  setDataflowStride,
} from '../../../store/ModelEditorStore';

import { RootState } from '../../../store';

interface DataflowModalProps {
  graph: Graph;
}

const DataflowModal: React.FC<DataflowModalProps> = ({ graph }) => {
  const dispatch = useDispatch();

  // global redux states
  const {
    dataflowLabel,
    dataflowProtocol,
    dataflowModalSelectedCell,
    dataflowModalOpen,
    dataflowStride,
  } = useSelector((state: RootState) => state.modelEditor);

  const handleSubmit = () => {
    if (dataflowModalSelectedCell) {
      const cell = graph.getCellById(dataflowModalSelectedCell);
      if (cell.isEdge()) {
        const strideString = Object.keys(dataflowStride)
          .filter((key) => dataflowStride[key as keyof DataflowStride])
          .map((key) => key.charAt(0).toUpperCase())
          .join(' ');

        const label = Dataflow.setDataflowLabel(
          dataflowLabel,
          dataflowProtocol,
          strideString,
        );
        cell.setLabelAt(0, label);
      }
      dispatch(setDataflowModalOpen(false));
    }
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDataflowLabel(event.target.value));
  };

  const handleProtocolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDataflowProtocol(event.target.value));
  };

  const handleStrideChange = (key: keyof DataflowStride) => {
    const updatedDataflowStride = {
      ...dataflowStride,
      [key]: !dataflowStride[key],
    };
    dispatch(setDataflowStride(updatedDataflowStride));
  };

  return (
    <Modal
      open={dataflowModalOpen}
      onClose={() => dispatch(setDataflowModalOpen(false))}
      dimmer="blurring"
    >
      <Modal.Header>Edit Dataflow</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Name"
            placeholder="Add label..."
            name="name"
            value={dataflowLabel}
            autoFocus
            required
            onChange={handleLabelChange}
          />

          <Form.Input
            label="Protocol"
            placeholder="Add protocol..."
            name="protocol"
            value={dataflowProtocol}
            onChange={handleProtocolChange}
          />

          <div className="field" style={{ paddingBottom: '5px' }}>
            <label>STRIDE threats</label>
            <Form.Group>
              <Form.Field>
                <Checkbox
                  label={
                    <label>
                      <strong>S</strong>poofing
                    </label>
                  }
                  checked={dataflowStride.spoofing}
                  onChange={() => handleStrideChange('spoofing')}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label={
                    <label>
                      <strong>T</strong>ampering
                    </label>
                  }
                  checked={dataflowStride.tampering}
                  onChange={() => handleStrideChange('tampering')}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label={
                    <label>
                      <strong>R</strong>epudiation
                    </label>
                  }
                  checked={dataflowStride.repudiation}
                  onChange={() => handleStrideChange('repudiation')}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label={
                    <label>
                      <strong>I</strong>nformation disclosure
                    </label>
                  }
                  checked={dataflowStride.informationDisclosure}
                  onChange={() => handleStrideChange('informationDisclosure')}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label={
                    <label>
                      <strong>D</strong>enial of service
                    </label>
                  }
                  checked={dataflowStride.denialOfService}
                  onChange={() => handleStrideChange('denialOfService')}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label={
                    <label>
                      <strong>E</strong>levate privilege
                    </label>
                  }
                  checked={dataflowStride.elevatePrivilege}
                  onChange={() => handleStrideChange('elevatePrivilege')}
                />
              </Form.Field>
            </Form.Group>
          </div>

          <Form.Group className="form-button-group">
            <Form.Button primary type="submit">
              Submit
            </Form.Button>
            <Form.Button onClick={() => dispatch(setDataflowModalOpen(false))}>
              Cancel
            </Form.Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default DataflowModal;
