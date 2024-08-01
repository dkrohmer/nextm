import { Dispatch } from '@reduxjs/toolkit';
import { showToast, setDatabasePath } from '../../store/settings';
import { NavigateFunction } from 'react-router-dom';

export const handleDatabaseTypeChange = async (
  _: React.FormEvent<HTMLInputElement>,
  { value }: any,
  setUseDefaultDatabase: React.Dispatch<React.SetStateAction<boolean>>,
  setButtonLabel: React.Dispatch<React.SetStateAction<string>>,
  setInputPath: React.Dispatch<React.SetStateAction<string>>
) => {
  const isDefault = value === 'default';
  setUseDefaultDatabase(isDefault);
  setButtonLabel('Open');

  if (isDefault) {
    const defaultPath = await window.electron.getDefaultDbPath();
    setInputPath(defaultPath);
  } else {
    setInputPath('');
  }
};

export const handleOpenFilePicker = async (
  setInputPath: React.Dispatch<React.SetStateAction<string>>,
  setButtonLabel: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const filePath = await window.electron.openFilePicker();
    setInputPath(filePath);
    setButtonLabel('Open');
  } catch (err) {
    console.error('Error selecting file:', err);
  }
};

export const handleOpenDirectoryPicker = async (
  setInputPath: React.Dispatch<React.SetStateAction<string>>,
  setButtonLabel: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const directoryPath = await window.electron.openDirectoryPicker();
    setInputPath(directoryPath);
    setButtonLabel('Create');
  } catch (err) {
    console.error('Error selecting directory:', err);
  }
};

export const handlePathChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setInputPath: React.Dispatch<React.SetStateAction<string>>
) => {
  setInputPath(e.target.value);
};

export const handleFormSubmit = async (
  inputPath: string,
  buttonLabel: string,
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  try {
    if (!inputPath) {
      throw new Error('Please enter a valid path.');
    }

    new Promise(async (resolve, reject) => {
      let result;
      try {
        if (buttonLabel === 'Create') {
          result = await window.electron.createDatabase(inputPath);
        } else if (buttonLabel === 'Open') {
          result = await window.electron.openDatabase(inputPath);
        }

        if (result.success) {
          window.electron.getCurrentDbPath().then((currentPath: string) => {
            dispatch(setDatabasePath(currentPath));
            dispatch(
              showToast({
                promise: Promise.resolve(),
                loadingMessage: '',
                successMessage: `Current database: ${currentPath}`,
                errorMessage: '',
              }),
            );
            navigate('/');
            resolve(`Database set successfully:`);
          });
        } else {
          reject('Operation failed on backend.');
        }
      } catch (error) {
        reject('Error processing form submission.');
      }
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
  }
};
