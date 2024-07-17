import React, { useState, useEffect } from 'react';
import { Button, Form, Icon, Input, Popup, Radio } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { showToast, setDatabasePath } from '../../../store/SettingsStore';
import { useNavigate } from 'react-router-dom';

const SetDatabaseType: React.FC = () => {
  const { path } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [useDefaultDatabase, setUseDefaultDatabase] = useState<boolean>(true);
  const [inputPath, setInputPath] = useState<string>('default');
  const [buttonLabel, setButtonLabel] = useState<string>('Open');

  useEffect(() => {
    window.electron.getDefaultDbPath().then((defaultPath: string) => {
      if (path === defaultPath) {
        setUseDefaultDatabase(true);
        setInputPath(defaultPath);
      } else {
        setUseDefaultDatabase(false);
        setInputPath(path);
      }
    });
  }, [path]);

  const handleDatabaseTypeChange = async (
    _: React.FormEvent<HTMLInputElement>,
    { value }: any,
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

  const handleOpenFilePicker = async () => {
    try {
      const filePath = await window.electron.openFilePicker();
      setInputPath(filePath);
      setButtonLabel('Open');
    } catch (err) {
      console.error('Error selecting file:', err);
    }
  };

  const handleOpenDirectoryPicker = async () => {
    try {
      const directoryPath = await window.electron.openDirectoryPicker();
      setInputPath(directoryPath);
      setButtonLabel('Create');
    } catch (err) {
      console.error('Error selecting directory:', err);
    }
  };

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPath(e.target.value);
  };

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

  const isSetDatabaseDisabled = !inputPath || inputPath === path;

  return (
    <Form inverted>
      <div>
        <h3 style={{ display: 'inline-block' }}>
          <label>Database Type</label>
        </h3>
        <Popup
          trigger={
            <Icon
              name="info circle"
              style={{ display: 'inline-block', paddingLeft: '10px' }}
              inverted
            />
          }
          content={`By default, the database is stored in the app's respective user data folder depending on your operating system. However, you may also specify a custom database directory of your choice.`}
        />
      </div>
      <Form.Field>
        <Radio
          label="Default database"
          name="databaseType"
          value="default"
          checked={useDefaultDatabase}
          onChange={handleDatabaseTypeChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Custom database"
          name="databaseType"
          value="custom"
          checked={!useDefaultDatabase}
          onChange={handleDatabaseTypeChange}
        />
      </Form.Field>
      {!useDefaultDatabase && (
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
                  style={{
                    direction: 'rtl',
                    textOverflow: 'ellipsis',
                  }}
                />
              }
              content={`${inputPath || path}`}
            />
          </Form.Field>
        </>
      )}
      <Button
        primary
        disabled={isSetDatabaseDisabled}
        onClick={handleFormSubmit}
      >
        {buttonLabel}
      </Button>
    </Form>
  );
};

export default SetDatabaseType;
