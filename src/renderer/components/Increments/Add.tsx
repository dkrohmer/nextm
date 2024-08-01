import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { openAddModal } from '../../utils/incrementsHandlers';

const Add: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Button onClick={() => openAddModal(dispatch)} primary>
      + Add Increment
    </Button>
  );
};

export default Add;
