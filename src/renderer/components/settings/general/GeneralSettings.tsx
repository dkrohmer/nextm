import React from 'react';
import { Segment } from 'semantic-ui-react';
import SetDatabaseType from './SetDatabaseType';

const GeneralSettings: React.FC = () => {
  return (
    <Segment basic>
      <SetDatabaseType />
    </Segment>
  );
};

export default GeneralSettings;
