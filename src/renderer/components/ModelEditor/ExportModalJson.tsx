import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { RootState } from '../../store';
import { setExportFormat } from '../../store/modelEditor';

const ExportModalJson: React.FC = () => {
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
    dispatch(setExportFormat('json'));
  }

  /**
   * tsx
   */
  return (
    <Form.Field data-testid="json-form">
      <Radio
        data-testid="json-radio"
        label="JSON"
        name="format"
        value="json"
        checked={exportFormat === 'json'}
        onChange={handleChange}
      />
    </Form.Field>
  )
}

export default ExportModalJson;
