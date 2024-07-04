// File: /mnt/data/code_extracted/frontend/src/applets/model-editor/components/ExportModal.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Radio } from 'semantic-ui-react';

import { Graph } from '@antv/x6';

import { AppDispatch } from '../../../store';

import { 
  exportGraph,
  setExportModalOpen 
} from '../../../store/ModelEditorStore';
import { showToast } from '../../../store/SettingsStore';

interface ExportModalProps {
  graph: Graph,
  filename: string
}

const ExportModal: React.FC<ExportModalProps> = ({graph, filename}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isExportModalOpen
  } = useSelector((state: any) => state.modelEditor);

  const [format, setFormat] = useState('json');
  // const [directory, setDirectory] = useState('');

  const handleExport = async () => {
    try {
      dispatch(exportGraph({ format, filename, graph }));
      dispatch(setExportModalOpen(false));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    dispatch(setExportModalOpen(false));
  };

  if (!isExportModalOpen) return null;

  return (
    <Modal open={isExportModalOpen} onClose={handleClose} dimmer="blurring">
      <Modal.Header>
        {'Export current model'}
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleExport}>
        <Form.Field>
            <label>Format</label>
            <Form.Group>
              <Form.Field>
                <Radio
                  label='JSON'
                  name='format'
                  value='json'
                  checked={format === 'json'}
                  onChange={() => setFormat('json')}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label='PNG'
                  name='format'
                  value='png'
                  checked={format === 'png'}
                  onChange={() => setFormat('png')}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label='JPEG'
                  name='format'
                  value='jpeg'
                  checked={format === 'jpeg'}
                  onChange={() => setFormat('jpeg')}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label='SVG'
                  name='format'
                  value='svg'
                  checked={format === 'svg'}
                  onChange={() => setFormat('svg')}
                />
              </Form.Field>
            </Form.Group>
          </Form.Field>
          <Form.Group className="form-button-group">
            <Form.Button primary type='submit'>
              Export
            </Form.Button>
            <Form.Button className="cancel-button" onClick={handleClose}>
              Cancel
            </Form.Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ExportModal;
