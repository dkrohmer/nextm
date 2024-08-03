import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import type { IModel } from '../../interfaces/IModel';
import { AppDispatch } from '../../store';
import { handleEdit } from '../../utils/modelHandlers';

interface ModelActionsEditProps {
  model: IModel;
  dispatch: AppDispatch;
}

const ModelActionsEdit: React.FC<ModelActionsEditProps> = ({ model, dispatch }) => (
  <Popup
    trigger={
      <Button basic icon size="tiny" onClick={(e) => handleEdit(e, model, dispatch)}>
        <Icon name="pencil" />
      </Button>
    }
    content={<span><strong>Edit model</strong> "{model.name}"</span>}
  />
);

export default ModelActionsEdit;
