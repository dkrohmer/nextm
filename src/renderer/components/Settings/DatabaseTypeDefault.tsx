import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { setUseDefaultDatabase, setButtonLabel, setInputPath } from '../../store/settings';

const DatabaseTypeDefault: React.FC = () => {
  /**
   * global states
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * global states
   */
  const { useDefaultDatabase } = useSelector((state: RootState) => state.settings);

  /**
   * handlers
   */
  const handleDatabaseTypeChange = async () => {
    dispatch(setUseDefaultDatabase(true));
    dispatch(setButtonLabel('Open'));
    const defaultPath = await window.electron.getDefaultDbPath();
    dispatch(setInputPath(defaultPath));
  };

  /**
   * tsx
   */
  return (
    <Form.Field>
      <Radio
        data-testid="default-db-radio"
        label="Default database"
        name="databaseType"
        value="default"
        checked={useDefaultDatabase}
        onChange={handleDatabaseTypeChange}
      />
    </Form.Field>
  );
};

export default DatabaseTypeDefault;
