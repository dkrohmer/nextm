import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, TextAreaProps } from 'semantic-ui-react';
import { setZoneDescription } from '../../store/modelEditor';
import { RootState } from '../../store';

const ZoneModalDescription: React.FC = () => {
  /**
   * global states
   */
  const { zoneDescription } = useSelector((state: RootState) => state.modelEditor);

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setZoneDescription(e.target.value));
  };

  /**
   * tsx
   */
  return (
    <Form.TextArea
      label="Description"
      placeholder="Description"
      value={zoneDescription}
      onChange={handleDescriptionChange}
      data-testid="zone-description"
    />
  );
};

export default ZoneModalDescription;
