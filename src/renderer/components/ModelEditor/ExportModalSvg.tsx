import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { RootState } from '../../store';
import { setExportFormat } from '../../store/modelEditor';

const ExportModalSvg: React.FC = () => {
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
    dispatch(setExportFormat('svg'));
  };

  /**
   * tsx
   */
  return (
    <Form.Field data-testid="svg-form">
      <Radio
        data-testid="svg-radio"
        label="SVG"
        name="format"
        value="svg"
        checked={exportFormat === 'svg'}
        onChange={handleChange}
      />
    </Form.Field>
  );
};

export default ExportModalSvg;
