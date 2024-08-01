import React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { handleDatabaseTypeChange } from '../../utils/settings/database-type-handlers';

interface DatabaseTypeCustomProps {
  useDefaultDatabase: boolean;
  setUseDefaultDatabase: React.Dispatch<React.SetStateAction<boolean>>;
  setButtonLabel: React.Dispatch<React.SetStateAction<string>>;
  path: string;
  inputPath: string;
  setInputPath: React.Dispatch<React.SetStateAction<string>>;
}

const DatabaseTypeCustom: React.FC<DatabaseTypeCustomProps> = ({
  useDefaultDatabase,
  setUseDefaultDatabase,
  setButtonLabel,
  path,
  inputPath,
  setInputPath,
}) => (
  <Form.Field>
    <Radio
      label="Custom database"
      name="databaseType"
      value="custom"
      checked={!useDefaultDatabase}
      onChange={(event, data) =>
        handleDatabaseTypeChange(event, data, setUseDefaultDatabase, setButtonLabel, setInputPath)
      }
    />
  </Form.Field>
);

export default DatabaseTypeCustom;
