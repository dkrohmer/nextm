import React from 'react';
import { Confirm as SemanticConfirm } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { cancelDelete, confirmDelete } from '../../utils/modelsHandlers';
import { AppDispatch } from '../../store';

interface ConfirmProps {
  open: boolean;
  modelToDelete: string | null;
}

const Confirm: React.FC<ConfirmProps> = ({ open, modelToDelete }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <SemanticConfirm
      open={open}
      onCancel={() => cancelDelete(dispatch)}
      onConfirm={() => confirmDelete(modelToDelete, dispatch)}
      content="Do you want to delete this model permanently?"
    />
  );
};

export default Confirm;
