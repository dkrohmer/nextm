import React from 'react';
import { Button } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDatabasePath, showToast } from '../../store/settings';

const DatabaseTypeSubmitButton: React.FC = () => {
  /**
   * global states
   */
  const { path, inputPath, buttonLabel }  = useSelector((state: RootState) => state.settings);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  /**
   * handlers
   */
  const handleFormSubmit = async () => {
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

  const handleDisabled = () => {
    if (path) {
      return !inputPath || inputPath === path;
    }
  }

  /**
   * tsx
   */
  return (
    <Button
      primary
      disabled={handleDisabled()}
      onClick={handleFormSubmit}
    >
      {buttonLabel}
    </Button>
  )
}

export default DatabaseTypeSubmitButton;
