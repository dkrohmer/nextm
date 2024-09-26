import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IIncrement } from '../../interfaces/IIncrement';
import { AppDispatch } from '../../store';
import '../../styles/products.css'; // Ensure this path is correct based on your project structure
import {
  setCurrentIncrement,
  setIncrementsIsCloning,
  setIncrementsModalOpen,
} from '../../store/increments';

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
    const cloneName = `${increment.name} (Copy)`;

    // Check if the resulting name exceeds 250 characters
    const maxLength = 250;
    let finalName = cloneName;

    if (finalName.length > maxLength) {
      const remainingLength = maxLength - 10; // 10 for the "..." and " (Copy)"
      finalName = `...${increment.name.slice(-remainingLength)} (Copy)`;
    }

    dispatch(setIncrementsIsCloning(true));
    dispatch(setCurrentIncrement({ ...increment, name: finalName }));
    dispatch(setIncrementsModalOpen(true));
  };

  const handleMouseEnter = () => {
    setPopupOpen(true);
  };

  const handleMouseLeave = () => {
    setPopupOpen(false);
  };
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
      content={
        <span>
          <strong>Clone increment</strong> "{increment.name}"
        </span>
      }
      open={popupOpen}
      onClose={handleMouseLeave}
    />
  );
};

export default ActionsClone;
