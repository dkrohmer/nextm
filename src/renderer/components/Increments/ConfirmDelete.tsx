import React from 'react';
import { Confirm } from 'semantic-ui-react';

interface IncrementsConfirmDeleteProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDelete: React.FC<IncrementsConfirmDeleteProps> = ({ open, onCancel, onConfirm }) => (
  <Confirm
    open={open}
    onCancel={onCancel}
    onConfirm={onConfirm}
    content="Deleting an increment will permanently delete all models associated with it. Do you want to delete this increment?"
  />
);

export default ConfirmDelete;
