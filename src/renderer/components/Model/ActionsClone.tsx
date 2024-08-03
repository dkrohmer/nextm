import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleClone } from '../../utils/modelHandlers';
import type { IModel } from '../../interfaces/IModel';

interface ActionsCloneProps {
  model: IModel;
  dispatch: AppDispatch;
}

const ActionsClone: React.FC<ActionsCloneProps> = ({ model, dispatch }) => (
  <Popup
    trigger={
      <Button basic icon size="tiny" onClick={(e) => handleClone(e, model, dispatch)}>
        <Icon name="clone" />
      </Button>
    }
    content={<span><strong>Clone model</strong> "{model.name}"</span>}
  />
);

export default ActionsClone;
