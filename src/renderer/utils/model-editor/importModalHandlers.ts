import { Graph } from '@antv/x6';
import { AppDispatch } from '../../store';
import { setImportModalOpen } from '../../store/modelEditor';
import { importGraph } from './importGraph';
import { showToast } from '../../store/settings';

export function handleDragOver(e: React.DragEvent, setIsDragging: React.Dispatch<React.SetStateAction<boolean>>) {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(true);
}

export function handleDragLeave(e: React.DragEvent, setIsDragging: React.Dispatch<React.SetStateAction<boolean>>) {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);
}

export function handleDrop(
  e: React.DragEvent,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setFileName: React.Dispatch<React.SetStateAction<string | null>>,
  setIsFileValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleFileUpload: (fileContent: any) => void
) {
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
          setError(null);
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
}

export function handleFileChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setFileName: React.Dispatch<React.SetStateAction<string | null>>,
  setIsFileValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleFileUpload: (fileContent: any) => void
) {
  const file = e.target.files?.[0];
  if (file) {
    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const fileContent = JSON.parse(event.target?.result as string);
          handleFileUpload(fileContent);
          setFileName(file.name);
          setError(null);
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
}

export function handleClick(fileInputRef: React.RefObject<HTMLInputElement>) {
  fileInputRef.current?.click();
}

export async function handleImport(
  graph: Graph,
  jsonData: any,
  dispatch: AppDispatch,
  setFileName: React.Dispatch<React.SetStateAction<string | null>>,
  setJsonData: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsFileValid: React.Dispatch<React.SetStateAction<boolean>>
) {
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
}

export function handleClose(
  dispatch: AppDispatch,
  setFileName: React.Dispatch<React.SetStateAction<string | null>>,
  setJsonData: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsFileValid: React.Dispatch<React.SetStateAction<boolean>>
) {
  dispatch(setImportModalOpen(false));
  setFileName(null);
  setJsonData(null);
  setError(null);
  setIsFileValid(false);
}

export function handleFileUpload(setJsonData: React.Dispatch<React.SetStateAction<any>>, fileContent: any) {
  setJsonData(fileContent);
}