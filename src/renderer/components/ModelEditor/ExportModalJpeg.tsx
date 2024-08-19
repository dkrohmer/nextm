import React from 'react';
import { Form, Radio } from 'semantic-ui-react';

interface ExportModalJpegProps {
  format: string;
  setFormat: (format: string) => void;
}

const ExportModalJpeg: React.FC<ExportModalJpegProps> = ({ format, setFormat }) => {
  /**
   * tsx
   */
  return (
    <Form.Field>
      <Radio
        label="JPEG"
        name="format"
        value="jpeg"
        checked={format === 'jpeg'}
        onChange={() => setFormat('jpeg')}
      />
    </Form.Field>
  )
}

export default ExportModalJpeg;
