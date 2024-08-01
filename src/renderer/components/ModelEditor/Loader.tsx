import React from 'react';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) return null;
  return (
    <Dimmer active inverted>
      <SemanticLoader>Loading Model...</SemanticLoader>
    </Dimmer>
  );
};

export default Loader;
