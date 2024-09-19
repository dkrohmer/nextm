import React from 'react';
import { useSelector } from 'react-redux';
import { Label, Segment } from 'semantic-ui-react';
import { RootState } from '../../store';

const Empty: React.FC = () => {
  /**
   * global states
   */
  const {
    increments,
    incrementsError,
    incrementsIsLoading,
  } = useSelector((state: RootState) => state.increments);

  /**
   * tsx
   */
  return (
    <>
      {!incrementsIsLoading && !incrementsError && increments.length === 0 && (
        <Segment className="increments-segment">
          <h3 className="empty-message-header">Increments, anyone? 👀</h3>
          <div className="empty-message-body">
            Hang on! Add one by clicking: <Label>+ Add increment</Label>
          </div>
        </Segment>
      )}
    </>
  );
}


export default Empty;
