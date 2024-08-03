import React, { useState } from 'react';
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
  increment
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Popup
      trigger={
        <Button
          className="action-delete"
          basic
          size="tiny"
          icon
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(increment.id, dispatch);
          }}
          onMouseEnter={() => setPopupOpen(true)}
          onMouseLeave={() => setPopupOpen(false)}
        >
          <Icon color="red" name="trash" />
        </Button>
      }
      content={<span><strong>Delete increment</strong> "{increment.name}"</span>}
      open={popupOpen}
      onClose={() => setPopupOpen(false)}
    />
  );
};

export default ActionsDelete;
