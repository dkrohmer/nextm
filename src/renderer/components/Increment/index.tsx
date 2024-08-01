import React, { useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import Models from '../Models';
import type { IIncrement } from '../../interfaces/IIncrement';
import type { IProduct } from '../../interfaces/IProduct';
import '../../styles/increment.css';
import Title from './Title';
import Actions from './Actions';

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
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="increment-wrapper"
    >
      <Accordion.Title
        active={isActive}
        index={index}
        onClick={(e) => handleAccordionClick(e, { index })}
        className="increment-container"
      >
        <Title number={number} name={increment.name} />
        <Actions increment={increment} number={number} isHovering={isHovering} />
      </Accordion.Title>
      <Accordion.Content active={isActive} className="increment-content">
        <Models product={product} increment={increment} number={number} />
      </Accordion.Content>
    </div>
  );
};

export default Increment;
