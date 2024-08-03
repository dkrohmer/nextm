import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleDelete } from '../../utils/modelHandlers';
import { IModel } from '../../interfaces/IModel';
import '../../styles/products.css'; // Ensure this path is correct based on your project structure

interface ActionsDeleteProps {
  model: IModel;
  dispatch: AppDispatch;
}

const ActionsDelete: React.FC<ActionsDeleteProps> = ({ model, dispatch }) => (
  <Popup
    trigger={
      <Button
        basic
        icon
        size="tiny"
        className="action-button"
        onClick={(e) => handleDelete(e, model.id, dispatch)}
      >
        <Icon color="red" name="trash" />
      </Button>
    }
    content={<span><strong>Delete model</strong> "{model.name}"</span>}
  />
);

export default ActionsDelete;
