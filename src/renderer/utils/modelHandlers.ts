import {
  setModelsCurrentModel,
  setModelsModalOpen,
  setModelsConfirmOpen,
  setModelToDelete,
  setModelsIsEditing,
  setModelsIsCloning,
} from '../store/models';
import { AppDispatch } from '../store';
import type { IModel } from '../interfaces/IModel';

export const handleEdit = (
  e: React.MouseEvent<HTMLButtonElement>,
  model: IModel,
  dispatch: AppDispatch
) => {
  e.stopPropagation();
  dispatch(setModelsCurrentModel(model));
  dispatch(setModelsModalOpen(true));
  dispatch(setModelsIsEditing(true));
};

export const handleClone = (
  e: React.MouseEvent<HTMLButtonElement>,
  model: IModel,
  dispatch: AppDispatch
) => {
  e.stopPropagation();
  dispatch(setModelsIsCloning(true));
  dispatch(setModelsCurrentModel({ ...model, name: `${model.name} (Copy)` }));
  dispatch(setModelsModalOpen(true));
};

export const handleDelete = (
  e: React.MouseEvent<HTMLButtonElement>,
  modelId: string,
  dispatch: AppDispatch
) => {
  e.stopPropagation();
  dispatch(setModelToDelete(modelId));
  dispatch(setModelsConfirmOpen(true));
};

export const handleMouseEnter = (setIsHovering: React.Dispatch<React.SetStateAction<boolean>>) => {
  setIsHovering(true);
};

export const handleMouseLeave = (setIsHovering: React.Dispatch<React.SetStateAction<boolean>>) => {
  setIsHovering(false);
};
