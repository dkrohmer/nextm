import React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { setExportFormat } from '../../store/modelEditor';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const ExportModalPng: React.FC = () => {
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
    dispatch(setExportFormat('png'));
  }

  /**
   * tsx
   */
  return (
    <Form.Field data-testid="png-form">
      <Radio
        data-testid="png-radio"
        label="PNG"
        name="format"
        value="png"
        checked={exportFormat === 'png'}
        onChange={handleChange}
      />
    </Form.Field>
  )
}

export default ExportModalPng;
