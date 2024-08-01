import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IIncrement } from '../../interfaces/IIncrement';
import { handleClone } from '../../utils/incrementHandlers';
import { AppDispatch } from '../../store';

interface ActionsCloneProps {
  increment: IIncrement;
  number: number;
}

const ActionsClone: React.FC<ActionsCloneProps> = ({
  increment,
  number,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Popup
      trigger={
        <Button basic size="tiny" icon onClick={(e) => handleClone(e, dispatch, increment)}>
          <Icon name="clone" />
        </Button>
      }
      content={`Clone increment "#${number}: ${increment.name}"`}
    />
  );
};

export default ActionsClone;
