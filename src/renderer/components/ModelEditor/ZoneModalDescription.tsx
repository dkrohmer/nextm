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
  const handleDescriptionChange = (_e: React.ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) => {
    dispatch(setZoneDescription(data.value as string));
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
    />
  );
};

export default ZoneModalDescription;
