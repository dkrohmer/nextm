import React from 'react';
import { useSelector } from 'react-redux';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';
import { RootState } from '../../store';

const Loader: React.FC = () => {
  /**
   * global states
   */
  const { modelsIsLoading } = useSelector((state: RootState) => state.models);

  /**
   * tsx
   */
  return (
    <Dimmer active={modelsIsLoading} inverted data-testid="models-loader">
      <SemanticLoader>Loading models...</SemanticLoader>
    </Dimmer>
  );
};

export default Loader;
