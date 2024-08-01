import React from 'react';
import { Form, Button, Input, Popup } from 'semantic-ui-react';
import {
  handleOpenFilePicker,
  handleOpenDirectoryPicker,
  handlePathChange,
} from '../../utils/settings/database-type-handlers';

interface DatabaseTypePickerProps {
  path: string;
  inputPath: string;
  setInputPath: React.Dispatch<React.SetStateAction<string>>;
  setButtonLabel: React.Dispatch<React.SetStateAction<string>>;
}

const DatabaseTypePicker: React.FC<DatabaseTypePickerProps> = ({
  path,
  inputPath,
  setInputPath,
  setButtonLabel,
}) => (
  <>
    <Form.Field>
      <Button primary onClick={() => handleOpenFilePicker(setInputPath, setButtonLabel)}>
        Open existing
      </Button>
      <Button primary onClick={() => handleOpenDirectoryPicker(setInputPath, setButtonLabel)}>
        Create new
      </Button>
    </Form.Field>
    <Form.Field>
      <Popup
        trigger={
          <Input
            placeholder={path}
            value={inputPath}
            onChange={(e) => handlePathChange(e, setInputPath)}
            readOnly
            className="settings-input-path-change"
          />
        }
        content={`${inputPath || path}`}
      />
    </Form.Field>
  </>
);

export default DatabaseTypePicker;
