import React from 'react';
import { useSelector } from 'react-redux';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';
import { RootState } from '../../store';

const Loader: React.FC = () => {
  /**
   * global states
   */
  const { productIsLoading } = useSelector(
    (state: RootState) => state.products,
  );

  /**
   * tsx
   */
  return (
    <Dimmer active={productIsLoading} inverted data-testid="product-loader">
      <SemanticLoader>Loading Product...</SemanticLoader>
    </Dimmer>
  );
};

export default Loader;
