import React from 'react';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  /**
   * tsx
   */
  return (
    <>
      {isLoading && (
        <Dimmer active inverted>
          <SemanticLoader>Loading Model...</SemanticLoader>
        </Dimmer>
      )}
    </>
  );
};

export default Loader;
