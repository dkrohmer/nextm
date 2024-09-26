import React from 'react';
import { Confirm as SemanticConfirm } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteModel } from '../../services/api/models';
import { setModelsConfirmOpen } from '../../store/models';

const ConfirmDelete: React.FC = () => {
  /**
   * global states
   */
  const { modelsConfirmOpen, modelToDelete } = useSelector(
    (state: RootState) => state.models,
  );

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleConfirmDelete = () => {
    if (modelToDelete) {
      dispatch(deleteModel(modelToDelete));
    }
  };

  const handleCancelDelete = () => {
    dispatch(setModelsConfirmOpen(false));
  };

  /**
   * tsx
   */
  return (
    <SemanticConfirm
      open={modelsConfirmOpen}
      onCancel={handleCancelDelete}
      onConfirm={handleConfirmDelete}
      content="Do you want to delete this model permanently?"
    />
  );
};

export default ConfirmDelete;
