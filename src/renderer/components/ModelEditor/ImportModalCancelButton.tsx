import React from 'react';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { setImportModalOpen } from '../../store/modelEditor';

interface ImportModalCancelButtonProps {
  dispatch: AppDispatch;
}

const ImportModalCancelButton: React.FC<ImportModalCancelButtonProps> = ({ dispatch }) => {
  return (
    <Form.Button className="cancel-button" onClick={() => dispatch(setImportModalOpen(false))}>
      Cancel
    </Form.Button>
  );
};

export default ImportModalCancelButton;
