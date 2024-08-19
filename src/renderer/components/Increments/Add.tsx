import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { setCurrentIncrement, setIncrementsIsEditing, setIncrementsModalOpen } from '../../store/increments';

const Add: React.FC = () => {  
  /**
   * global states
   */
  const isModalOpen = useSelector((state: RootState) => state.increments.incrementsModalOpen);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleAddModal = () => {
    if (!isModalOpen) {
      dispatch(setIncrementsIsEditing(false));
      dispatch(setIncrementsModalOpen(true));
      dispatch(
        setCurrentIncrement({
          id: '',
          name: '',
          start: '',
          end: '',
          deadline: '',
          state: '',
          productId: '',
          models: [],
        }),
      );
    }
  };

  /**
   * tsx
   */
  return (
    <Button onClick={handleAddModal} primary>
      + Add Increment
    </Button>
  );
};

export default Add;
