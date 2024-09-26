import React from 'react';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setDatabasePath, showToast } from '../../store/settings';

const DatabaseTypeSubmitButton: React.FC = () => {
  /**
   * global states
   */
  const { path, inputPath, buttonLabel } = useSelector(
    (state: RootState) => state.settings,
  );

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /**
   * handlers
   */
  const handleFormSubmit = async () => {
    try {
      if (!inputPath) {
        throw new Error('Please enter a valid path.');
      }

      let result;
      if (buttonLabel === 'Create') {
        result = await window.electron.createDatabase(inputPath);
      } else if (buttonLabel === 'Open') {
        result = await window.electron.openDatabase(inputPath);
      }

      if (result.success) {
        const currentPath = await window.electron.getCurrentDbPath();
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
      } else {
        throw new Error('Operation failed on backend.');
      }
    } catch (error) {
      console.error('Error processing form submission:', error);
    }
  };

  const handleDisabled = () => {
    if (path) {
      return !inputPath || inputPath === path;
    }
  };

  /**
   * tsx
   */
  return (
    <Button
      data-testid="submit-button"
      primary
      disabled={handleDisabled()}
      onClick={handleFormSubmit}
    >
      {buttonLabel}
    </Button>
  );
};

export default DatabaseTypeSubmitButton;
