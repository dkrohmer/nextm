import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';

const ImportModalSubmitButton: React.FC = () => {
  /**
   * global states
   */
  const { importIsFileValid } = useSelector((state: any) => state.modelEditor);

  /**
   * tsx
   */
  return (
    <Form.Button primary type="submit" disabled={!importIsFileValid}>
      Import
    </Form.Button>
  );
};

export default ImportModalSubmitButton;
