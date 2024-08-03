import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Checkbox } from 'semantic-ui-react';
import { RootState } from '../../store';
import { handleDataflowModalStrideChange } from '../../utils/model-editor/dataflowModalHandlers';
import type { DataflowStride } from '../../store/modelEditor';
import '../../styles/model-editor/dataflow-modal.css'; // Import the CSS file

const DataflowModalStride: React.FC = () => {
  const dispatch = useDispatch();
  const { dataflowStride } = useSelector((state: RootState) => state.modelEditor);

  return (
    <div className="field" style={{ paddingBottom: '5px' }}>
      <label>STRIDE threats</label>
      <Form.Group className="checkbox-group">
        {Object.keys(dataflowStride).map((key) => (
          <Form.Field key={key}>
            <Checkbox
              label={<label><strong>{key.charAt(0).toUpperCase()}</strong>{key.slice(1)}</label>}
              checked={dataflowStride[key as keyof DataflowStride]}
              onChange={() => handleDataflowModalStrideChange(key as keyof DataflowStride, dataflowStride, dispatch)}
            />
          </Form.Field>
        ))}
      </Form.Group>
    </div>
  );
};

export default DataflowModalStride;
