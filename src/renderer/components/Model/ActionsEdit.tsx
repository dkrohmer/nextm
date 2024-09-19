import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IModel } from '../../interfaces/IModel';
import { AppDispatch } from '../../store';
import { setModelsCurrentModel, setModelsIsEditing, setModelsModalOpen } from '../../store/models';
import '../../styles/products.css';

interface ModelActionsEditProps {
  model: IModel;
}

const ModelActionsEdit: React.FC<ModelActionsEditProps> = ({ model }) => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();
  
  /**
   * handlers
   */
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setModelsCurrentModel(model));
    dispatch(setModelsModalOpen(true));
    dispatch(setModelsIsEditing(true));
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
          onClick={handleEdit}
          data-testid="edit-button"
        >
          <Icon name="pencil" />
        </Button>
      }
      content={<span><strong>Edit model</strong> "{model.name}"</span>}
    />
  )
}

export default ModelActionsEdit;
