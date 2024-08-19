import React from 'react';
import { Accordion as SemanticAccordion } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import { RootState } from '../../store';
import Increment from '../Increment';
import { useSelector } from 'react-redux';

interface AccordionProps {
  product: IProduct;
}

const Accordion: React.FC<AccordionProps> = ({ product }) => {
  /**
   * global states
   */
  const { increments } = useSelector((state: RootState) => state.increments);

  /**
   * tsx
   */
  return (
    <SemanticAccordion fluid styled>
      {increments.map((increment, index) => (
        <Increment product={product} increment={increment} index={index}/>
      ))}
    </SemanticAccordion>
  )
}

export default Accordion;
