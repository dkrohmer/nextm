import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';

import { ImportOutlined } from '@ant-design/icons';
import { AppDispatch } from '../../../store';

import {
  importGraph,
  setImportModalOpen,
} from '../../../store/ModelEditorStore';

import { showToast, hideToast } from '../../../store/SettingsStore';

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileUpload = (fileContent: any) => {
    setJsonData(fileContent);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const { files } = e.dataTransfer;
      if (files.length <= 0) {
        setError('No files selected.');
        setFileName(null);
        setIsFileValid(false);
        return;
      }
      if (files.length > 1) {
        setError('Only one file allowed.');
        setFileName(null);
        setIsFileValid(false);
        return;
      }

      const file = files[0];
      if (file) {
        if (file.type === 'application/json') {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const fileContent = JSON.parse(event.target?.result as string);
              handleFileUpload(fileContent);
              setFileName(file.name);
              setError(null); // Clear the error when a valid file is selected
              setIsFileValid(true);
            } catch (err) {
              setError('Error parsing JSON file');
              setFileName(null);
              setIsFileValid(false);
            }
          };
          reader.readAsText(file);
        } else {
          setError('Invalid file type. Only JSON files allowed.');
          setFileName(null);
          setIsFileValid(false);
        }
      } else {
        setError('No file selected. Please select a valid JSON file.');
        setFileName(null);
        setIsFileValid(false);
      }
    },
    [handleFileUpload],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.type === 'application/json') {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const fileContent = JSON.parse(event.target?.result as string);
              handleFileUpload(fileContent);
              setFileName(file.name);
              setError(null); // Clear the error when a valid file is selected
              setIsFileValid(true);
            } catch (err) {
              setError('Error parsing JSON file');
              setFileName(null);
              setIsFileValid(false);
            }
          };
          reader.readAsText(file);
        } else {
          setError('Invalid file type. Only JSON files allowed.');
          setFileName(null);
          setIsFileValid(false);
        }
      } else {
        setError('No file selected. Please select a valid JSON file.');
        setFileName(null);
        setIsFileValid(false);
      }
    },
    [handleFileUpload],
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async () => {
    if (graph && jsonData) {
      try {
        const promise = dispatch(importGraph({ graph, jsonData })).unwrap();
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

        setFileName(null);
        setJsonData(null);
        setError(null);
        setIsFileValid(false);
      } catch (error) {
        setFileName(null);
        setJsonData(null);
        setError(null);
        setIsFileValid(false);
      }
    } else {
      setError('No file selected');
    }
  };

  const handleClose = () => {
    dispatch(setImportModalOpen(false));
    setFileName(null);
    setJsonData(null);
    setError(null);
    setIsFileValid(false);
  };

  useEffect(() => {
    if (!isImportModalOpen) {
      setFileName(null);
      setJsonData(null);
      setError(null);
      setIsFileValid(false);
    }
  }, [isImportModalOpen]);

  if (!isImportModalOpen) return null;

  return (
    <Modal open={isImportModalOpen} onClose={handleClose} dimmer="blurring">
      <Modal.Header>Import existing model</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleImport}>
          <Form.Field>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
              style={{
                background: '#f0f0f0',
                border: isDragging ? '2px dashed #2185d0' : '1px solid #ccc',
                padding: '20px',
                borderRadius: '5px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <ImportOutlined
                style={{ fontSize: '50px', color: 'gray', padding: '20px' }}
              />
              {!fileName && (
                <p style={{ color: 'gray' }}>
                  Drag and drop a JSON file here, or click to select a file.
                </p>
              )}
              {fileName && (
                <p style={{ color: 'gray' }}>Selected file: {fileName}</p>
              )}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <input
                type="file"
                accept="application/json"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </Form.Field>
          <Form.Group className="form-button-group">
            <Form.Button primary type="submit" disabled={!isFileValid}>
              Import
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

export default ImportModal;
