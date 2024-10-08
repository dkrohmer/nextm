import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IModel } from '../../interfaces/IModel';
import { AppDispatch } from '../../store';
import {
  setModelsCurrentModel,
  setModelsIsCloning,
  setModelsModalOpen,
} from '../../store/models';
import '../../styles/products.css';

interface ActionsCloneProps {
  model: IModel;
}

const ActionsClone: React.FC<ActionsCloneProps> = ({ model }) => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleClone = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const cloneName = `${model.name} (Copy)`;

    const maxLength = 250;
    let finalName = cloneName;

    if (finalName.length > maxLength) {
      const remainingLength = maxLength - 10; // 10 for the "..." and " (Copy)"
      finalName = `...${model.name.slice(-remainingLength)} (Copy)`;
    }

    dispatch(setModelsIsCloning(true));
    dispatch(setModelsCurrentModel({ ...model, name: finalName }));
    dispatch(setModelsModalOpen(true));
  };

  /**
   * tsx
   */
  return (
    <Popup
      trigger={
        <Button
          basic
          icon
          size="tiny"
          className="action-button"
          onClick={handleClone}
          data-testid="clone-button"
        >
          <Icon name="clone" />
        </Button>
      }
      content={
        <span>
          <strong>Clone model</strong> "{model.name}"
        </span>
      }
    />
  );
};
export default ActionsClone;
