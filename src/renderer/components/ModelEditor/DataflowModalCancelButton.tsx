import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { setDataflowModalOpen } from '../../store/modelEditor';

const DataflowModalCancelButton: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleCancel = () => {
    dispatch(setDataflowModalOpen(false));
  }

  /**
   * tsx
   */
  return (
    <Form.Button type="button" onClick={handleCancel}>
      Cancel
    </Form.Button>
  );
};

export default DataflowModalCancelButton;
