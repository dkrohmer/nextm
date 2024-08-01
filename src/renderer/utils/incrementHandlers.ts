import { AppDispatch } from '../store';
import { IIncrement } from '../interfaces/IIncrement';
import {
  setIncrementsModalOpen,
  setCurrentIncrement,
  setIncrementToDelete,
  setIncrementsConfirmOpen,
  setIncrementsIsCloning,
  setIncrementsIsEditing,
} from '../store/increments';

export const handleMouseEnter = (setIsHovering: (hover: boolean) => void) => {
  setIsHovering(true);
};

export const handleMouseLeave = (setIsHovering: (hover: boolean) => void) => {
  setIsHovering(false);
};

export const handleEdit = (
  e: React.MouseEvent<HTMLButtonElement>,
  dispatch: AppDispatch,
  increment: IIncrement
) => {
  e.stopPropagation();
  dispatch(setIncrementsIsEditing(true));
  dispatch(setCurrentIncrement(increment));
  dispatch(setIncrementsModalOpen(true));
};

export const handleClone = (
  e: React.MouseEvent<HTMLButtonElement>,
  dispatch: AppDispatch,
  increment: IIncrement
) => {
  e.stopPropagation();
  dispatch(setIncrementsIsCloning(true));
  dispatch(
    setCurrentIncrement({ ...increment, name: `${increment.name} (Copy)` })
  );
  dispatch(setIncrementsModalOpen(true));
};

export const handleDelete = (incrementId: string, dispatch: AppDispatch) => {
  dispatch(setIncrementToDelete(incrementId));
  dispatch(setIncrementsConfirmOpen(true));
};
