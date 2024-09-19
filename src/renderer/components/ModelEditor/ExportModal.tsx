import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { AppDispatch } from '../../store';
import ExportModalJson from './ExportModalJson';
import ExportModalPng from './ExportModalPng';
import ExportModalJpeg from './ExportModalJpeg';
import ExportModalSvg from './ExportModalSvg';
import ExportModalSubmit from './ExportModalSubmitButton';
import ExportModalCancel from './ExportModalCancelButton';
import { exportGraph } from '../../utils/exportGraph';
import { setExportModalOpen } from '../../store/modelEditor';

interface ExportModalProps {
  graph: Graph;
  filename: string;
}

const ExportModal: React.FC<ExportModalProps> = ({ graph, filename }) => {
  /**
   * global states
   */
  const { isExportModalOpen, exportFormat } = useSelector((state: any) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleSubmit = () => {
    try {
      dispatch(exportGraph({ exportFormat, filename, graph }));
      dispatch(setExportModalOpen(false));
    } catch (error) {
      console.error('Export failed:', error);
    }
  }

  const handleClose = () => {
    dispatch(setExportModalOpen(false));
  }  

  /**
   * tsx
   */
  return (
    <Modal open={isExportModalOpen} onClose={handleClose} dimmer="blurring">
      <Modal.Header>Export current model</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Format</label>
            <Form.Group>
              <ExportModalJson />
              <ExportModalPng />
              <ExportModalJpeg />
              <ExportModalSvg />
            </Form.Group>
          </Form.Field>
          <Form.Group className="form-button-group">
            <ExportModalSubmit />
            <ExportModalCancel />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ExportModal;
