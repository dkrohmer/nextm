import React from 'react';
import { Form } from 'semantic-ui-react';
import { ImportOutlined } from '@ant-design/icons';
import { handleDragOver, handleDragLeave, handleDrop, handleClick, handleFileChange } from '../../utils/model-editor/importModalHandlers';

interface ImportModalDndProps {
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setFileName: React.Dispatch<React.SetStateAction<string | null>>;
  setIsFileValid: React.Dispatch<React.SetStateAction<boolean>>;
  setJsonData: React.Dispatch<React.SetStateAction<any>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  error: string | null;
  fileName: string | null;
}

const ImportModalDnd: React.FC<ImportModalDndProps> = ({
  isDragging,
  setIsDragging,
  setError,
  setFileName,
  setIsFileValid,
  setJsonData,
  fileInputRef,
  error,
  fileName
}) => {
  return (
    <Form.Field>
      <div
        onDragOver={(e) => handleDragOver(e, setIsDragging)}
        onDragLeave={(e) => handleDragLeave(e, setIsDragging)}
        onDrop={(e) => handleDrop(e, setIsDragging, setError, setFileName, setIsFileValid, setJsonData)}
        onClick={() => handleClick(fileInputRef)}
        className={`drag-and-drop-area ${isDragging ? 'dragging' : ''}`}
      >
        <ImportOutlined className="import-icon" />
        {!fileName && <p className="file-message">Drag and drop a JSON file here, or click to select a file.</p>}
        {fileName && <p className="file-message">Selected file: {fileName}</p>}
        {error && <p className="error-message">{error}</p>}
        <input
          type="file"
          accept="application/json"
          className="hidden-input"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e, setError, setFileName, setIsFileValid, setJsonData)}
        />
      </div>
    </Form.Field>
  );
};

export default ImportModalDnd;
