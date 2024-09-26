import React from 'react';
import { Form, Button, Input, Popup } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  setInputPath,
  setButtonLabel,
  setCustomDatabasePath,
} from '../../store/settings';

const DatabaseTypePicker: React.FC = () => {
  /**
   * global states
   */
  const { path, inputPath, useDefaultDatabase } = useSelector(
    (state: RootState) => state.settings,
  );

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setInputPath(value));
    if (!useDefaultDatabase) {
      dispatch(setCustomDatabasePath(value));
    }
  };

  const handleOpenFilePicker = async () => {
    const filePath = await window.electron.openFilePicker();
    dispatch(setInputPath(filePath));
    dispatch(setButtonLabel('Open'));
    if (!useDefaultDatabase) {
      dispatch(setCustomDatabasePath(filePath));
    }
  };

  const handleOpenDirectoryPicker = async () => {
    const directoryPath = await window.electron.openDirectoryPicker();
    dispatch(setInputPath(directoryPath));
    dispatch(setButtonLabel('Create'));
    if (!useDefaultDatabase) {
      dispatch(setCustomDatabasePath(directoryPath));
    }
  };

  /**
   * tsx
   */
  return (
    <>
      <Form.Field>
        <Button primary onClick={handleOpenFilePicker}>
          Open existing
        </Button>
        <Button primary onClick={handleOpenDirectoryPicker}>
          Create new
        </Button>
      </Form.Field>
      <Form.Field>
        <Popup
          trigger={
            <Input
              placeholder={path}
              value={inputPath}
              onChange={handlePathChange}
              readOnly
            />
          }
          content={`${inputPath || path}`}
        />
      </Form.Field>
    </>
  );
};

export default DatabaseTypePicker;
