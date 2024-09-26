import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IIncrement } from '../../interfaces/IIncrement';
import { AppDispatch } from '../../store';
import '../../styles/products.css'; // Ensure this path is correct based on your project structure
import {
  setCurrentIncrement,
  setIncrementsIsEditing,
  setIncrementsModalOpen,
} from '../../store/increments';

interface ActionsEditProps {
  increment: IIncrement;
  number: number;
}

const ActionsEdit: React.FC<ActionsEditProps> = ({ increment }) => {
  /*
   * local states
   */
  const [popupOpen, setPopupOpen] = useState(false);

  /*
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setIncrementsIsEditing(true));
    dispatch(setCurrentIncrement(increment));
    dispatch(setIncrementsModalOpen(true));
  };

  const handleMouseEnter = () => {
    setPopupOpen(true);
  };

  const handleMouseLeave = () => {
    setPopupOpen(false);
  };

  /*
   * tsx
   */
  return (
    <Popup
      trigger={
        <Button
          className="action-button"
          basic
          size="tiny"
          icon
          onClick={handleEdit}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Icon name="pencil" />
        </Button>
      }
      content={
        <span>
          <strong>Edit increment</strong> "{increment.name}"
        </span>
      }
      open={popupOpen}
      onClose={() => setPopupOpen(false)}
    />
  );
};

export default ActionsEdit;
