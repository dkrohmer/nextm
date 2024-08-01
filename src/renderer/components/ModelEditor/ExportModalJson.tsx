import React from 'react';
import { Form, Radio } from 'semantic-ui-react';

interface ExportModalJsonProps {
  format: string;
  setFormat: (format: string) => void;
}

const ExportModalJson: React.FC<ExportModalJsonProps> = ({ format, setFormat }) => (
  <Form.Field>
    <Radio
      label="JSON"
      name="format"
      value="json"
      checked={format === 'json'}
      onChange={() => setFormat('json')}
    />
  </Form.Field>
);

export default ExportModalJson;
