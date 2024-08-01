import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { handleDelete } from '../../utils/modelHandlers';

interface ActionsDeleteProps {
  modelId: string;
  dispatch: AppDispatch;
}

const ActionsDelete: React.FC<ActionsDeleteProps> = ({ modelId, dispatch }) => (
  <Popup
    trigger={
      <Button icon size="tiny" onClick={(e) => handleDelete(e, modelId, dispatch)}>
        <Icon color="red" name="trash" />
      </Button>
    }
    content={`Delete model`}
  />
);

export default ActionsDelete;
