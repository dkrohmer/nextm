import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { AppDispatch } from '../../store';
import { handleExportModalCancel } from '../../utils/model-editor/exportModalHandlers';
import ExportModalJson from './ExportModalJson';
import ExportModalPng from './ExportModalPng';
import ExportModalJpeg from './ExportModalJpeg';
import ExportModalSvg from './ExportModalSvg';
import ExportModalSubmit from './ExportModalSubmitButton';
import ExportModalCancel from './ExportModalCancelButton';

interface ExportModalProps {
  graph: Graph;
  filename: string;
}

const ExportModal: React.FC<ExportModalProps> = ({ graph, filename }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isExportModalOpen } = useSelector((state: any) => state.modelEditor);

  const [format, setFormat] = useState('json');

  if (!isExportModalOpen) return null;

  return (
    <Modal open={isExportModalOpen} onClose={() => handleExportModalCancel(dispatch)} dimmer="blurring">
      <Modal.Header>Export current model</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Format</label>
            <Form.Group>
              <ExportModalJson format={format} setFormat={setFormat} />
              <ExportModalPng format={format} setFormat={setFormat} />
              <ExportModalJpeg format={format} setFormat={setFormat} />
              <ExportModalSvg format={format} setFormat={setFormat} />
            </Form.Group>
          </Form.Field>
          <Form.Group className="form-button-group">
            <ExportModalSubmit format={format} filename={filename} graph={graph} />
            <ExportModalCancel />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ExportModal;
