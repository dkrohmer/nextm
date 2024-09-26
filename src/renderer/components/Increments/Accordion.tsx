import React from 'react';
import { Accordion as SemanticAccordion } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import Increment from '../Increment';
import useSetActiveIncrement from '../../hooks/useSetActiveIncrement';

const Accordion: React.FC = () => {
  /**
   * global states
   */
  const { product } = useSelector((state: RootState) => state.products);

  const {
    increments,
    incrementsError,
    incrementsIsLoading,
    incrementsIsLoaded,
  } = useSelector((state: RootState) => state.increments);

  /**
   * hooks
   */
  const { productId, incrementId } = useParams<{
    productId: string;
    incrementId?: string;
  }>();
  useSetActiveIncrement(incrementsIsLoaded, increments, incrementId);

  /**
   * tsx
   */
  return (
    <>
      {!incrementsIsLoading &&
        !incrementsError &&
        increments.length > 0 &&
        product && (
          <SemanticAccordion fluid styled data-testid="accordion">
            {increments.map((increment, index) => (
              <Increment
                key={increment.id}
                product={product}
                increment={increment}
                index={index}
              />
            ))}
          </SemanticAccordion>
        )}
    </>
  );
};

export default Accordion;
