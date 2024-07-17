import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import SetGridType from './SetGridType';
import SetExplicitObjectSelection from './SetExplicitObjectSelection';

const ModelEditorSettings: React.FC = () => {
  return (
    <Segment basic>
      <SetGridType />
      <Form inverted style={{ paddingTop: '50px' }}>
        <SetExplicitObjectSelection />
      </Form>
    </Segment>
  );
};

export default ModelEditorSettings;
