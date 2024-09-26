import React from 'react';
import { Confirm } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { deleteIncrement } from '../../services/api/increments';
import {
  setIncrementsActiveIndex,
  setIncrementsConfirmOpen,
} from '../../store/increments';

const ConfirmDelete: React.FC = () => {
  /**
   * global states
   */
  const { incrementsConfirmOpen, incrementToDelete } = useSelector(
    (state: RootState) => state.increments,
  );
  const { product } = useSelector((state: RootState) => state.products);

  /**
   * hooks
   */
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleConfirm = () => {
    if (incrementToDelete) {
      dispatch(deleteIncrement(incrementToDelete));
      navigate(`/products/${product?.id}/`);
      dispatch(setIncrementsActiveIndex(-1));
    }
  };

  const handleCancel = () => {
    dispatch(setIncrementsConfirmOpen(false));
  };

  /**
   * tsx
   */
  return (
    <Confirm
      open={incrementsConfirmOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      content="Deleting an increment will permanently delete all models associated with it. Do you want to delete this increment?"
    />
  );
};

export default ConfirmDelete;
