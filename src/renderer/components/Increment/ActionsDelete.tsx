import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { IIncrement } from '../../interfaces/IIncrement';
import '../../styles/products.css';
import { setIncrementsConfirmOpen, setIncrementToDelete } from '../../store/increments';

interface ActionsDeleteProps {
  increment: IIncrement;
  number: number;
}

const ActionsDelete: React.FC<ActionsDeleteProps> = ({ increment }) => {
  /**
   * local states
   */
  const [popupOpen, setPopupOpen] = useState(false);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setIncrementToDelete(increment.id));
    dispatch(setIncrementsConfirmOpen(true));
  };

  const handleMouseEnter = () => {
    setPopupOpen(true)
  }

  const handleMouseLeave = () => {
    setPopupOpen(false)
  }

  /**
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
          onClick={handleDelete}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Icon color="red" name="trash" />
        </Button>
      }
      content={<span><strong>Delete increment</strong> "{increment.name}"</span>}
      open={popupOpen}
      onClose={() => setPopupOpen(false)}
    />
  );
};

export default ActionsDelete;
