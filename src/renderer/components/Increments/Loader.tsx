import React from 'react';
import { useSelector } from 'react-redux';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';
import { RootState } from '../../store';

const Loader: React.FC = () => {
  /**
   * global states
   */
  const { incrementsIsLoading } = useSelector(
    (state: RootState) => state.increments,
  );

  /**
   * tsx
   */
  return (
    <>
      {incrementsIsLoading && (
        <Dimmer active inverted data-testid="increments-loader">
          <SemanticLoader>Loading Increments...</SemanticLoader>
        </Dimmer>
      )}
    </>
  );
};

export default Loader;
