import React from 'react';
import ModelActionsEdit from './ActionsEdit';
import ModelActionsClone from './ActionsClone';
import ModelActionsDelete from './ActionsDelete';
import type { IModel } from '../../interfaces/IModel';
import '../../styles/model.css';

interface ActionsProps {
  model: IModel;
  isVisible: boolean;
}

const Actions: React.FC<ActionsProps> = ({ model, isVisible }) => {
  /**
   * tsx
   */
  return (
    <div
      className={`model-actions ${isVisible ? 'visible' : ''}`}
      data-testid="model-actions-container"
    >
      <ModelActionsEdit model={model} />
      <ModelActionsClone model={model} />
      <ModelActionsDelete model={model} />
    </div>
  );
};

export default Actions;
