import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IIncrement } from '../../interfaces/IIncrement';
import { handleEdit } from '../../utils/incrementHandlers';
import { AppDispatch } from '../../store';

interface ActionsEditProps {
  increment: IIncrement;
  number: number;
}

const ActionsEdit: React.FC<ActionsEditProps> = ({
  increment,
  number,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Popup
      trigger={
        <Button basic size="tiny" icon onClick={(e) => handleEdit(e, dispatch, increment)}>
          <Icon name="pencil" />
        </Button>
      }
      content={`Edit increment "#${number}: ${increment.name}"`}
    />
  );
};

export default ActionsEdit;
