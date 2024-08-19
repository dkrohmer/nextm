import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface ModelLoaderProps {
  isLoading: boolean;
}

const ModelLoader: React.FC<ModelLoaderProps> = ({ isLoading }) => {
  /**
   * tsx
   */
  return (
    <Dimmer active={isLoading} inverted>
      <Loader>Loading model...</Loader>
    </Dimmer>
  )
}

export default ModelLoader;
