import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store';
import { setDataflowLabel } from '../../store/modelEditor';

const DataflowModalLabel: React.FC = () => {
  /**
   * global states
   */
  const { dataflowLabel } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDataflowLabel(event.target.value));
  }

  /**
   * tsx
   */
  return (
    <Form.Input
      label="Label"
      placeholder="Add label..."
      name="label"
      value={dataflowLabel}
      autoFocus
      required
      onChange={handleLabelChange}
    />
  );
};

export default DataflowModalLabel;