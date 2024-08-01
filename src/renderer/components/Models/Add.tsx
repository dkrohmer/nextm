import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openAddModal } from '../../utils/modelsHandlers';
import { AppDispatch } from '../../store';

const Add: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Button className="models-add-button" primary onClick={() => openAddModal(dispatch)}>
      + Add Threat Model
    </Button>
  );
};

export default Add;
