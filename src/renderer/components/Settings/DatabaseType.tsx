import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Icon, Popup } from 'semantic-ui-react';
import { RootState } from '../../store';
import useInitializeDatabasePath from '../../hooks/useInitializeDatabasePath';
import DatabaseTypeCustom from './DatabaseTypeCustom';
import DatabaseTypeDefault from './DatabaseTypeDefault';
import DatabaseTypeSubmitButton from './DatabaseTypeSubmitButton';
import DatabaseTypePicker from './DatabaseTypePicker';
import '../../styles/settings.css';

const DatabaseType: React.FC = () => {
  /**
   * global states
   */
  const useDefaultDatabase = useSelector((state: RootState) => state.settings.useDefaultDatabase);

  /**
   * hooks
   */
  useInitializeDatabasePath();

  /**
   * tsx
   */
  return (
    <Form inverted>
      <div>
        <h3 className="settings-label" data-testid="settings-label">
          <label>Database Type</label>
        </h3>
        <Popup
          trigger={<Icon name="info circle" inverted className="settings-info" data-testid="info-icon" />}
          content={`By default, the database is stored in the app's respective user data folder depending on your operating system. However, you may also specify a custom database directory of your choice.`}
        />
      </div>
      <DatabaseTypeDefault />
      <DatabaseTypeCustom />
      {!useDefaultDatabase && (
        <DatabaseTypePicker />
      )}
      <DatabaseTypeSubmitButton />
    </Form>
  );
};

export default DatabaseType;
