import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IModel } from '../../interfaces/IModel';
import { AppDispatch } from '../../store';
import { setModelsConfirmOpen, setModelToDelete } from '../../store/models';
import '../../styles/products.css';

interface ActionsDeleteProps {
  model: IModel;
}

const ActionsDelete: React.FC<ActionsDeleteProps> = ({ model }) => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setModelToDelete(model.id));
    dispatch(setModelsConfirmOpen(true));
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
          onClick={handleDelete}
          data-testid="delete-button"
        >
          <Icon color="red" name="trash" />
        </Button>
      }
      content={<span><strong>Delete model</strong> "{model.name}"</span>}
    />
  )
}

export default ActionsDelete;
