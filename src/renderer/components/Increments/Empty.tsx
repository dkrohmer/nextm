import React from 'react';
import { Label } from 'semantic-ui-react';

const Empty: React.FC = () => (
  <div>
    <h3 className="empty-message-header">Increments, anyone? 👀</h3>
    <div className="empty-message-body">
      You are just one click away: <Label>+ Add increment</Label>
    </div>
  </div>
);

export default Empty;
