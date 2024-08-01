import React from 'react';
import { Form } from 'semantic-ui-react';

interface ImportModalSubmitButtonProps {
  isFileValid: boolean;
}

const ImportModalSubmitButton: React.FC<ImportModalSubmitButtonProps> = ({ isFileValid }) => {
  return (
    <Form.Button primary type="submit" disabled={!isFileValid}>
      Import
    </Form.Button>
  );
};

export default ImportModalSubmitButton;
