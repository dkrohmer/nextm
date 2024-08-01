import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { AppDispatch } from '../../store';
import { setImportModalOpen } from '../../store/modelEditor';
import { handleImport } from '../../utils/model-editor/importModalHandlers';
import useResetImportModalState from '../../hooks/model-editor/useResetImportModalState';
import ImportModalDnd from './ImportModalDnd';
import ImportModalSubmitButton from './ImportModalSubmitButton';
import ImportModalCancelButton from './ImportModalCancelButton';
import '../../styles/model-editor/import-modal.css';

interface ImportModalProps {
  graph: Graph;
}

const ImportModal: React.FC<ImportModalProps> = ({ graph }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isImportModalOpen } = useSelector((state: any) => state.modelEditor);

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [jsonData, setJsonData] = useState<Graph | null>(null);
  const [isFileValid, setIsFileValid] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useResetImportModalState(isImportModalOpen, setFileName, setJsonData, setError, setIsFileValid);

  if (!isImportModalOpen) return null;

  return (
    <Modal open={isImportModalOpen} onClose={() => dispatch(setImportModalOpen(false))} dimmer="blurring">
      <Modal.Header>Import existing model</Modal.Header>
      <Modal.Content>
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleImport(graph, jsonData, dispatch, setFileName, setJsonData, setError, setIsFileValid);
        }}>
          <ImportModalDnd
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            setError={setError}
            setFileName={setFileName}
            setIsFileValid={setIsFileValid}
            setJsonData={setJsonData}
            fileInputRef={fileInputRef}
            error={error}
            fileName={fileName}
          />
          <Form.Group className="form-button-group">
            <ImportModalSubmitButton isFileValid={isFileValid} />
            <ImportModalCancelButton dispatch={dispatch} />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ImportModal;
