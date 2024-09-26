import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { RootState } from '../../store';
import { setExportFormat } from '../../store/modelEditor';

const ExportModalJpeg: React.FC = () => {
  /**
   * global states
   */
  const { exportFormat } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleChange = () => {
    dispatch(setExportFormat('jpeg'));
  };

  /**
   * tsx
   */
  return (
    <Form.Field data-testid="jpeg-form">
      <Radio
        data-testid="jpeg-radio"
        label="JPEG"
        name="format"
        value="jpeg"
        checked={exportFormat === 'jpeg'}
        onChange={handleChange}
      />
    </Form.Field>
  );
};

export default ExportModalJpeg;
