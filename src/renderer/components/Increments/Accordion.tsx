import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion as SemanticAccordion } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import { IIncrement } from '../../interfaces/IIncrement';
import { AppDispatch } from '../../store';
import { handleAccordionClick } from '../../utils/incrementsHandlers';
import Increment from '../Increment';

interface AccordionProps {
  increments: IIncrement[];
  incrementsActiveIndex: number | null;
  product: IProduct;
  dispatch: AppDispatch;
  productId: string;
  navigate: ReturnType<typeof useNavigate>;
}

const Accordion: React.FC<AccordionProps> = ({
  increments,
  incrementsActiveIndex,
  product,
  dispatch,
  productId,
  navigate,
}) => (
  <SemanticAccordion fluid styled>
    {increments.map((increment, index) => (
      <Increment
        key={increment.id}
        product={product}
        increment={increment}
        index={index}
        number={increments.length - index - 1}
        isActive={incrementsActiveIndex === index}
        handleAccordionClick={() =>
          handleAccordionClick(
            index,
            increments,
            incrementsActiveIndex ?? -1,
            productId ?? '',
            dispatch,
            navigate
          )
        }
      />
    ))}
  </SemanticAccordion>
);

export default Accordion;
