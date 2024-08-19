import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { setUseDefaultDatabase, setButtonLabel, setInputPath, setCustomDatabasePath } from '../../store/settings';

const DatabaseTypeCustom: React.FC = () => {
  /**
   * global states
   */
  const { useDefaultDatabase, customDatabasePath } = useSelector((state: RootState) => state.settings);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleDatabaseTypeChange = () => {
    dispatch(setUseDefaultDatabase(false));
    dispatch(setButtonLabel('Open'));
    dispatch(setInputPath(customDatabasePath || ''));
  };

  /**
   * tsx
   */
  return (
    <Form.Field>
      <Radio
        label="Custom database"
        name="databaseType"
        value="custom"
        checked={!useDefaultDatabase}
        onChange={handleDatabaseTypeChange}
      />
    </Form.Field>
  );
};

export default DatabaseTypeCustom;
