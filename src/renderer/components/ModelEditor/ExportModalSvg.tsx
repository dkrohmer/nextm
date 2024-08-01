import React from 'react';
import { Form, Radio } from 'semantic-ui-react';

interface ExportModalSvgProps {
  format: string;
  setFormat: (format: string) => void;
}

const ExportModalSvg: React.FC<ExportModalSvgProps> = ({ format, setFormat }) => (
  <Form.Field>
    <Radio
      label="SVG"
      name="format"
      value="svg"
      checked={format === 'svg'}
      onChange={() => setFormat('svg')}
    />
  </Form.Field>
);

export default ExportModalSvg;
