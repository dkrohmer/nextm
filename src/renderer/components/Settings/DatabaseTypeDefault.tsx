import React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { handleDatabaseTypeChange } from '../../utils/settings/database-type-handlers';

interface DatabaseTypeDefaultProps {
  useDefaultDatabase: boolean;
  setUseDefaultDatabase: React.Dispatch<React.SetStateAction<boolean>>;
  setButtonLabel: React.Dispatch<React.SetStateAction<string>>;
  setInputPath: React.Dispatch<React.SetStateAction<string>>;
}

const DatabaseTypeDefault: React.FC<DatabaseTypeDefaultProps> = ({
  useDefaultDatabase,
  setUseDefaultDatabase,
  setButtonLabel,
  setInputPath,
}) => (
  <Form.Field>
    <Radio
      label="Default database"
      name="databaseType"
      value="default"
      checked={useDefaultDatabase}
      onChange={(event, data) =>
        handleDatabaseTypeChange(event, data, setUseDefaultDatabase, setButtonLabel, setInputPath)
      }
    />
  </Form.Field>
);

export default DatabaseTypeDefault;
