import React, { useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setIncrementsActiveIndex } from '../../store/increments';
import type { IIncrement } from '../../interfaces/IIncrement';
import type { IProduct } from '../../interfaces/IProduct';
import Models from '../Models';
import Title from './Title';
import Actions from './Actions';
import '../../styles/increment.css';

interface IncrementProps {
  product: IProduct;
  increment: IIncrement;
  index: number;
}

const Increment: React.FC<IncrementProps> = ({ product, increment, index }) => {
  /**
   * local states
   */
  const [isHovering, setIsHovering] = useState(false);

  /**
   * global states
   */
  const { increments, incrementsActiveIndex } = useSelector(
    (state: RootState) => state.increments,
  );

  /**
   * hooks
   */
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleAccordionClick = () => {
    if (index === incrementsActiveIndex) {
      dispatch(setIncrementsActiveIndex(-1));
      navigate(`/products/${product.id}`);
    } else {
      dispatch(setIncrementsActiveIndex(index));
      navigate(`/products/${product.id}/increments/${increment.id}`);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleNumbering = () => {
    return increments.length - index - 1;
  };

  /**
   * tsx
   */
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="increment-wrapper"
      data-testid={`increment-wrapper-${index}`}
    >
      <Accordion.Title
        active={incrementsActiveIndex === index}
        index={index}
        onClick={handleAccordionClick}
        className="increment-container"
        data-testid={`accordion-title-${index}`}
      >
        <Title number={handleNumbering()} name={increment.name} />
        <Actions
          increment={increment}
          number={handleNumbering()}
          isHovering={isHovering}
        />
      </Accordion.Title>
      <Accordion.Content
        active={incrementsActiveIndex === index}
        className="increment-content"
        data-testid={`accordion-content-${index}`}
      >
        <Models product={product} increment={increment} />
      </Accordion.Content>
    </div>
  );
};

export default Increment;
