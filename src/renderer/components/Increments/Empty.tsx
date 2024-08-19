import React from 'react';
import { Label, Segment } from 'semantic-ui-react';

const Empty: React.FC = () => {
  /**
   * tsx
   */
  return (
    <Segment className="increments-segment">
      <h3 className="empty-message-header">Increments, anyone? 👀</h3>
      <div className="empty-message-body">
        Hang on! Add one by clicking: <Label>+ Add increment</Label>
      </div>
    </Segment>
  )
}

export default Empty;
