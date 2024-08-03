import React, { useState } from 'react';
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
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Popup
      trigger={
        <Button
          className="action-clone"
          basic
          size="tiny"
          icon
          onClick={(e) => handleClone(e, dispatch, increment)}
          onMouseEnter={() => setPopupOpen(true)}
          onMouseLeave={() => setPopupOpen(false)}
        >
          <Icon name="clone" />
        </Button>
      }
      content={<span><strong>Clone increment</strong> "{increment.name}"</span>}
      open={popupOpen}
      onClose={() => setPopupOpen(false)}
    />
  );
};

export default ActionsClone;
