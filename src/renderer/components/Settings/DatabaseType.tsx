import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Icon, Popup } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import useInitializeDatabasePath from '../../hooks/useInitializeDatabasePath';
import DatabaseTypeDefault from './DatabaseTypeDefault';
import DatabaseTypeCustom from './DatabaseTypeCustom';
import DatabaseTypeSubmitButton from './DatabaseTypeSubmitButton';
import DatabaseTypePicker from './DatabaseTypePicker';
import '../../styles/settings.css';

const DatabaseType: React.FC = () => {
  const { path } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [useDefaultDatabase, setUseDefaultDatabase] = useState<boolean>(true);
  const [inputPath, setInputPath] = useState<string>('default');
  const [buttonLabel, setButtonLabel] = useState<string>('Open');

  useInitializeDatabasePath(setUseDefaultDatabase, setInputPath);

  const isSetDatabaseDisabled = !inputPath || inputPath === path;

  return (
    <Form inverted>
      <div>
        <h3 className="settings-label">
          <label>Database Type</label>
        </h3>
        <Popup
          trigger={<Icon name="info circle" inverted className="settings-info" />}
          content={`By default, the database is stored in the app's respective user data folder depending on your operating system. However, you may also specify a custom database directory of your choice.`}
        />
      </div>
      <DatabaseTypeDefault
        useDefaultDatabase={useDefaultDatabase}
        setUseDefaultDatabase={setUseDefaultDatabase}
        setButtonLabel={setButtonLabel}
        setInputPath={setInputPath}
      />
      <DatabaseTypeCustom
        useDefaultDatabase={useDefaultDatabase}
        setUseDefaultDatabase={setUseDefaultDatabase}
        setButtonLabel={setButtonLabel}
        path={path}
        inputPath={inputPath}
        setInputPath={setInputPath}
      />
      {!useDefaultDatabase && (
        <DatabaseTypePicker
          path={path}
          inputPath={inputPath}
          setInputPath={setInputPath}
          setButtonLabel={setButtonLabel}
        />
      )}
      <DatabaseTypeSubmitButton
        isSetDatabaseDisabled={isSetDatabaseDisabled}
        inputPath={inputPath}
        buttonLabel={buttonLabel}
        dispatch={dispatch}
        navigate={navigate}
      />
    </Form>
  );
};

export default DatabaseType;
