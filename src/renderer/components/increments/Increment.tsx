import React, { useState } from 'react';
import { Accordion, Button, Icon, Popup } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import Models from '../models/Models';
import type { IIncrement } from '../../interfaces/IIncrement';
import type { IProduct } from '../../interfaces/IProduct';

import { AppDispatch } from '../../store';

import {
  setIncrementsModalOpen,
  setCurrentIncrement,
  setIncrementToDelete,
  setIncrementsConfirmOpen,
  setIncrementsIsCloning,
  setIncrementsIsEditing,
} from '../../store/IncrementsStore';

interface IncrementProps {
  increment: IIncrement;
  product: IProduct;
  index: number;
  number: number;
  isActive: boolean;
  handleAccordionClick: (
    e: React.MouseEvent<HTMLDivElement>,
    titleProps: any,
  ) => void;
}

const Increment: React.FC<IncrementProps> = ({
  increment,
  product,
  index,
  number,
  isActive,
  handleAccordionClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [showThreatModels] = useState<boolean>(true); // State to manage whether to show ThreatModel component
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setIncrementsIsEditing(true));
    dispatch(setCurrentIncrement(increment));
    dispatch(setIncrementsModalOpen(true));
  };

  const handleClone = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(setIncrementsIsCloning(true));
    dispatch(
      setCurrentIncrement({ ...increment, name: `${increment.name} (Copy)` }),
    ); // Set the increment to clone
    dispatch(setIncrementsModalOpen(true)); // Open the modal
  };

  const handleDelete = (incrementId: string) => {
    dispatch(setIncrementToDelete(incrementId));
    dispatch(setIncrementsConfirmOpen(true));
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Accordion.Title
        active={isActive}
        index={index}
        onClick={(e) => handleAccordionClick(e, { index })}
      >
        <div style={{ display: 'flex' }}>
          <div
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'left',
              display: 'flex',
            }}
          >
            <Icon name="dropdown" />
            Increment #{number}: {increment.name}
          </div>
          {/* {isHovering && ( */}
          <div style={{ visibility: isHovering ? 'visible' : 'hidden' }}>
            <Popup
              trigger={
                <Button basic size="tiny" icon onClick={handleEdit}>
                  <Icon name="pencil" />
                </Button>
              }
              content={`Edit increment "#${number}: ${increment.name}"`}
            />

            <Popup
              trigger={
                <Button basic size="tiny" icon onClick={handleClone}>
                  <Icon name="clone" />
                </Button>
              }
              content={`Clone increment "#${number}: ${increment.name}"`}
            />

            <Popup
              trigger={
                <Button
                  basic
                  size="tiny"
                  icon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(increment.id);
                  }}
                >
                  <Icon color="red" name="trash" />
                </Button>
              }
              content={`Delete increment "#${number}: ${increment.name}"`}
            />
          </div>
          {/* )} */}
        </div>
      </Accordion.Title>
      <Accordion.Content active={isActive}>
        {/* <Segment attached='bottom'> */}
        {showThreatModels && (
          <Models product={product} increment={increment} number={number} />
        )}
        {/* </Segment> */}
      </Accordion.Content>
    </div>
  );
};

export default Increment;
