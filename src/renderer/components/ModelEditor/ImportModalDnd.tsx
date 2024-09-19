import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { ImportOutlined } from '@ant-design/icons';
import { AppDispatch } from '../../store';
import { setImportError, setImportFileName, setImportIsDragging, setImportIsFileValid, setImportJsonData } from '../../store/modelEditor';

const ImportModalDnd: React.FC = () => {
  /**
   * global states
   */
  const {
    isImportModalOpen,
    importIsDragging,
    importError,
    importFileName,
    importJsonData,
    importIsFileValid,
  } = useSelector((state: any) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>()
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * handlers
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setImportIsDragging(true));
  }
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setImportIsDragging(false));
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setImportIsDragging(false));
  
    const { files } = e.dataTransfer;

    if (files.length <= 0) {
      dispatch(setImportError('No files selected.'));
      dispatch(setImportFileName(null));
      dispatch(setImportIsFileValid(false));
      return;
    }
    if (files.length > 1) {
      dispatch(setImportError('Only one file allowed.'));
      dispatch(setImportFileName(null));
      dispatch(setImportIsFileValid(false));
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
            dispatch(setImportFileName(file.name));
            dispatch(setImportError(null));
            dispatch(setImportIsFileValid(true));
          } catch (err) {
            dispatch(setImportError('Error parsing JSON file'));
            dispatch(setImportFileName(null));
            dispatch(setImportIsFileValid(false));
          }
        };
        reader.readAsText(file);
      } else {
        dispatch(setImportError('Invalid file type. Only JSON files allowed.'));
        dispatch(setImportFileName(null));
        dispatch(setImportIsFileValid(false));
      }
    }
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const fileContent = JSON.parse(event.target?.result as string);
            handleFileUpload(fileContent);
            dispatch(setImportFileName(file.name));
            dispatch(setImportError(null));
            dispatch(setImportIsFileValid(true));
          } catch (err) {
            dispatch(setImportError('Error parsing JSON file'));
            dispatch(setImportFileName(null));
            dispatch(setImportIsFileValid(false));
          }
        };
        reader.readAsText(file);
      } else {
        dispatch(setImportError('Invalid file type. Only JSON files allowed.'));
        dispatch(setImportFileName(null));
        dispatch(setImportIsFileValid(false));
      }
    } else {
      dispatch(setImportError('No file selected. Please select a valid JSON file.'));
      dispatch(setImportFileName(null));
      dispatch(setImportIsFileValid(false));
    }
  }
  
  const handleClick = () => {
    fileInputRef.current?.click();
  }
  
  const handleFileUpload = (fileContent: any) => {
    dispatch(setImportJsonData(fileContent));
  }

  /**
   * tsx
   */
  return (
    <Form.Field>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`drag-and-drop-area ${importIsDragging ? 'dragging' : ''}`}
        data-testid="drop-area"
      >
        <ImportOutlined className="import-icon" />
        {!importFileName && <p className="file-message">Drag and drop a JSON file here, or click to select a file.</p>}
        {importFileName && <p className="file-message">Selected file: {importFileName}</p>}
        {importError && <p className="error-message">{importError}</p>}
        <input
          type="file"
          accept="application/json"
          className="hidden-input"
          ref={fileInputRef}
          onChange={handleFileChange}
          data-testid="file-input"
        />
      </div>
    </Form.Field>
  );
};

export default ImportModalDnd;
