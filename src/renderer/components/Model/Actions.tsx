import React from 'react';
import { List } from 'semantic-ui-react';
import ModelActionsEdit from './ActionsEdit';
import ModelActionsClone from './ActionsClone';
import ModelActionsDelete from './ActionsDelete';
import { AppDispatch } from '../../store';
import type { IModel } from '../../interfaces/IModel';

interface ActionsProps {
  model: IModel;
  dispatch: AppDispatch;
}

const Actions: React.FC<ActionsProps> = ({ model, dispatch }) => (
  <List.Content className="model-actions">
    <ModelActionsEdit model={model} dispatch={dispatch} />
    <ModelActionsClone model={model} dispatch={dispatch} />
    <ModelActionsDelete modelId={model.id} dispatch={dispatch} />
  </List.Content>
);

export default Actions;
