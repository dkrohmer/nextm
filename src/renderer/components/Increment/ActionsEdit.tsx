import React, { useState } from 'react';
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
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Popup
      trigger={
        <Button
          className="action-edit"
          basic
          size="tiny"
          icon
          onClick={(e) => handleEdit(e, dispatch, increment)}
          onMouseEnter={() => setPopupOpen(true)}
          onMouseLeave={() => setPopupOpen(false)}
        >
          <Icon name="pencil" />
        </Button>
      }
      content={<span><strong>Edit increment</strong> "{increment.name}"</span>}
      open={popupOpen}
      onClose={() => setPopupOpen(false)}
    />
  );
};

export default ActionsEdit;
