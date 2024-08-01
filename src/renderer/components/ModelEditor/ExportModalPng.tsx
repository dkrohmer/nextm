import React from 'react';
import { Form, Radio } from 'semantic-ui-react';

interface ExportModalPngProps {
  format: string;
  setFormat: (format: string) => void;
}

const ExportModalPng: React.FC<ExportModalPngProps> = ({ format, setFormat }) => (
  <Form.Field>
    <Radio
      label="PNG"
      name="format"
      value="png"
      checked={format === 'png'}
      onChange={() => setFormat('png')}
    />
  </Form.Field>
);

export default ExportModalPng;
