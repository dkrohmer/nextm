import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Checkbox } from 'semantic-ui-react';
import { RootState } from '../../store';
import { setDataflowStride, type DataflowStride } from '../../store/modelEditor';
import '../../styles/model-editor/dataflow-modal.css';

const DataflowModalStride: React.FC = () => {
  /**
   * global states
   */
  const { dataflowStride } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleStrideChange = (key: keyof DataflowStride) => {
    const updatedDataflowStride = {
      ...dataflowStride,
      [key]: !dataflowStride[key],
    };
    dispatch(setDataflowStride(updatedDataflowStride));
  };

  /**
   * Format the key to include spaces before capital letters
   */
  const formatLabel = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').trim();
  };

  /**
   * tsx
   */
  return (
    <div className="field">
      <label>STRIDE threats</label>
      <Form.Group className="checkbox-group">
        {Object.keys(dataflowStride).map((key) => (
          <Form.Field key={key}>
            <div data-testid={`checkbox-${key}`}>
              <Checkbox
                label={<label><strong>{key.charAt(0).toUpperCase()}</strong>{formatLabel(key.slice(1))}</label>}
                checked={dataflowStride[key as keyof DataflowStride]}
                onChange={() => handleStrideChange(key as keyof DataflowStride)}
              />
            </div>
          </Form.Field>
        ))}
      </Form.Group>
    </div>
  );
};

export default DataflowModalStride;
