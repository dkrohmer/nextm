import React from 'react';
import { List } from 'semantic-ui-react';
import ModelActionsEdit from './ActionsEdit';
import ModelActionsClone from './ActionsClone';
import ModelActionsDelete from './ActionsDelete';
import type { IModel } from '../../interfaces/IModel';
import '../../styles/products.css';

interface ActionsProps {
  model: IModel;
}

const Actions: React.FC<ActionsProps> = ({ model }) => {
  /**
   * tsx
   */
  return (
    <List.Content className="model-actions">
      <ModelActionsEdit model={model} />
      <ModelActionsClone model={model} />
      <ModelActionsDelete model={model} />
    </List.Content>
  )
}

export default Actions;
