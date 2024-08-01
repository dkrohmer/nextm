import React from 'react';
import { Button } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleFormSubmit } from '../../utils/settings/database-type-handlers';
import { NavigateFunction } from 'react-router-dom';

interface DatabaseTypeSubmitButtonProps {
  isSetDatabaseDisabled: boolean;
  inputPath: string;
  buttonLabel: string;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}

const DatabaseTypeSubmitButton: React.FC<DatabaseTypeSubmitButtonProps> = ({
  isSetDatabaseDisabled,
  inputPath,
  buttonLabel,
  dispatch,
  navigate,
}) => (
  <Button
    primary
    disabled={isSetDatabaseDisabled}
    onClick={() => handleFormSubmit(inputPath, buttonLabel, dispatch, navigate)}
  >
    {buttonLabel}
  </Button>
);

export default DatabaseTypeSubmitButton;
