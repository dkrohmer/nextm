import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { setZoneModalOpen } from '../../store/modelEditor';

const ZoneModalCancelButton: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleClose = () => {
    dispatch(setZoneModalOpen(false));
  };

  /**
   * tsx
   */
  return <Form.Button onClick={handleClose}>Cancel</Form.Button>;
};

export default ZoneModalCancelButton;
