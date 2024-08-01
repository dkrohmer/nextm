import React from 'react';
import { Dimmer, Loader as SemanticLoader} from 'semantic-ui-react';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => (
  <Dimmer active={isLoading} inverted>
    <SemanticLoader>Loading Products...</SemanticLoader>
  </Dimmer>
);

export default Loader;
