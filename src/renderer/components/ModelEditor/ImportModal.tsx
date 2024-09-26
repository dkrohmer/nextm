import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { AppDispatch } from '../../store';
import {
  setImportModalOpen,
  setImportError,
  setImportFileName,
  setImportJsonData,
  setImportIsFileValid,
} from '../../store/modelEditor';
import useResetImportModalState from '../../hooks/model-editor/useResetImportModalState';
import ImportModalDnd from './ImportModalDnd';
import ImportModalSubmitButton from './ImportModalSubmitButton';
import ImportModalCancelButton from './ImportModalCancelButton';
import '../../styles/model-editor/import-modal.css';
import { showToast } from '../../store/settings';
import { importGraph } from '../../utils/importGraph';

interface ImportModalProps {
  graph: Graph;
}

const ImportModal: React.FC<ImportModalProps> = ({ graph }) => {
  /**
   * global states
   */
  const { isImportModalOpen, importJsonData } = useSelector(
    (state: any) => state.modelEditor,
  );

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();
  useResetImportModalState(isImportModalOpen);

  /**
   * handlers
   */
  const handleSubmit = async () => {
    if (graph && importJsonData) {
      try {
        const promise = dispatch(
          importGraph({ graph, jsonData: importJsonData }),
        ).unwrap();
        dispatch(setImportModalOpen(false));

        dispatch(
          showToast({
            promise,
            loadingMessage: 'Importing threat model...',
            successMessage: 'Threat model imported successfully',
            errorMessage: 'Failed to import threat model',
          }),
        );

        await promise;

        dispatch(setImportFileName(null));
        dispatch(setImportJsonData(null));
        dispatch(setImportError(null));
        dispatch(setImportIsFileValid(false));
      } catch (error) {
        dispatch(setImportFileName(null));
        dispatch(setImportJsonData(null));
        dispatch(setImportError(null));
        dispatch(setImportIsFileValid(false));
      }
    } else {
      dispatch(setImportError('No file selected'));
    }
  };

  const handleClose = () => {
    dispatch(setImportModalOpen(false));
    dispatch(setImportFileName(null));
    dispatch(setImportJsonData(null));
    dispatch(setImportError(null));
    dispatch(setImportIsFileValid(false));
  };

  /**
   * tsx
   */
  return (
    <Modal open={isImportModalOpen} onClose={handleClose} dimmer="blurring">
      <Modal.Header>Import existing model</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <ImportModalDnd />
          <Form.Group className="form-button-group">
            <ImportModalSubmitButton />
            <ImportModalCancelButton />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ImportModal;
