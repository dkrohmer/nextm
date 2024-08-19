import React, { useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import Models from '../Models';
import type { IIncrement } from '../../interfaces/IIncrement';
import type { IProduct } from '../../interfaces/IProduct';
import '../../styles/increment.css';
import Title from './Title';
import Actions from './Actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setIncrementsActiveIndex } from '../../store/increments';
import { useNavigate } from 'react-router-dom';

interface IncrementProps {
  product: IProduct;
  increment: IIncrement;
  index: number;
}

const Increment: React.FC<IncrementProps> = ( { product, increment, index } ) => {  
  /*
   * local states
   */  
  const [isHovering, setIsHovering] = useState(false);

  /*
   * global states
   */  
  const {
    increments,
    incrementsActiveIndex,
  } = useSelector((state: RootState) => state.increments);

  /*
   * hooks
   */
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  /*
   * handlers
   */
  const handleAccordionClick = () => {
    const increment = increments[index];
    if (index === incrementsActiveIndex) {
      dispatch(setIncrementsActiveIndex(-1));
      navigate(`/products/${product?.id}`);
    } else {
      navigate(`/products/${product?.id}/increments/${increment.id}`);
      dispatch(setIncrementsActiveIndex(index));
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  }

  const handleMouseLeave = () => {
    setIsHovering(false);
  }

  const handleNumbering = () => {
    return increments.length - index - 1
  }

  /*
   * tsx
   */
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="increment-wrapper"
    >
      <Accordion.Title
        active={incrementsActiveIndex === index}
        index={index}
        onClick={handleAccordionClick}
        className="increment-container"
      >
        <Title number={handleNumbering()} name={increment.name} />
        <Actions increment={increment} number={handleNumbering()} isHovering={isHovering} />
      </Accordion.Title>
      <Accordion.Content active={incrementsActiveIndex === index} className="increment-content">
        <Models product={product} increment={increment} />
      </Accordion.Content>
    </div>
  );
};

export default Increment;
