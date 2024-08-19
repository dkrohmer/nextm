import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IIncrement } from '../../interfaces/IIncrement';
import { AppDispatch } from '../../store';
import '../../styles/products.css'; // Ensure this path is correct based on your project structure
import { setCurrentIncrement, setIncrementsIsCloning, setIncrementsModalOpen } from '../../store/increments';

interface ActionsCloneProps {
  increment: IIncrement;
  number: number;
}

const ActionsClone: React.FC<ActionsCloneProps> = ({ increment }) => {
  /**
   * local states
   */
  const [popupOpen, setPopupOpen] = useState(false);

  /**
   * handlers
   */
  const handleClone = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setIncrementsIsCloning(true));
    dispatch(
      setCurrentIncrement({ ...increment, name: `${increment.name} (Copy)` })
    );
    dispatch(setIncrementsModalOpen(true));
  };

  const handleMouseEnter = () => {
    setPopupOpen(true)
  }

  const handleMouseLeave = () => {
    setPopupOpen(false)
  }

  /*
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

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
          onClick={handleClone}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Icon name="clone" />
        </Button>
      }
      content={<span><strong>Clone increment</strong> "{increment.name}"</span>}
      open={popupOpen}
      onClose={() => setPopupOpen(false)}
    />
  );
};

export default ActionsClone;
