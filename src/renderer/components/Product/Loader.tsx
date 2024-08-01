// ProductLoader.tsx
import React from 'react';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

interface LoaderProps {
  productIsLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ productIsLoading }) => (
  <Dimmer active={productIsLoading} inverted>
    <SemanticLoader>Loading Product...</SemanticLoader>
  </Dimmer>
);

export default Loader;
