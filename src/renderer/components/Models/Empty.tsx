import React from 'react';
import { Label } from 'semantic-ui-react';

const Empty: React.FC = () => (
  <div>
    <h3 className="empty-message-header">No threat models here yet 😔</h3>
    <div className="empty-message-body">
      Add one by clicking <Label>+ Add Threat Model</Label>
    </div>
  </div>
);

export default Empty;
