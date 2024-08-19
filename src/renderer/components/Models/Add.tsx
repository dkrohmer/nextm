import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { setModelsCurrentModel, setModelsIsEditing, setModelsModalOpen } from '../../store/models';

const Add: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleAddModal = () => {
    dispatch(
      setModelsCurrentModel({
        id: '',
        name: '',
        createdAt: '',
        incrementId: '',
      }),
    );
    dispatch(setModelsModalOpen(true));
    dispatch(setModelsIsEditing(false));
  };

  /**
   * tsx
   */
  return (
    <Button className="models-add-button" primary onClick={handleAddModal}>
      + Add Threat Model
    </Button>
  );
};

export default Add;
