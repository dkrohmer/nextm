import React from 'react';
import { Accordion, Header } from 'semantic-ui-react';
import GeneralSettings from './GeneralSettings';
import ModelEditorSettings from './ModelEditorSettings';
import '../../styles/settings.css';

const Settings: React.FC = () => {
  /**
   * tsx
   */
  return (
    <>
      <Header as="h1" inverted className="settings-title">
        Settings
      </Header>

      <Accordion inverted>
        <GeneralSettings />
        <ModelEditorSettings />
      </Accordion>
    </>
  );
};

export default Settings;
