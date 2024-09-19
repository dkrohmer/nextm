import React from 'react';
import { useSelector } from 'react-redux';
import { Label } from 'semantic-ui-react';
import { RootState } from '../../store';

const Empty: React.FC = () => {
  /**
   * global states
   */
  const { 
    models, 
    modelsError, 
    modelsIsLoading, 
  } = useSelector((state: RootState) => state.models);
  
  /**
   * tsx
   */
  return (
    <>
      {!modelsError && !modelsIsLoading && models && models.length === 0 && (
        <div>
          <h3 className="empty-message-header">No threat models here yet 😔</h3>
          <div className="empty-message-body">
            Add one by clicking <Label>+ Add Threat Model</Label>
          </div>
        </div>
      )}
    </>
  );
}

export default Empty;
