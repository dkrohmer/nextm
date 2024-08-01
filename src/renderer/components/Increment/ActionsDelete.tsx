import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { handleDelete } from '../../utils/incrementHandlers';
import { AppDispatch } from '../../store';
import { IIncrement } from '../../interfaces/IIncrement';

interface ActionsDeleteProps {
  increment: IIncrement;
  number: number;
}

const ActionsDelete: React.FC<ActionsDeleteProps> = ({
  increment,
  number,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Popup
      trigger={
        <Button
          basic
          size="tiny"
          icon
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(increment.id, dispatch);
          }}
        >
          <Icon color="red" name="trash" />
        </Button>
      }
      content={`Delete increment "#${number}: ${increment.name}"`}
    />
  );
};

export default ActionsDelete;
