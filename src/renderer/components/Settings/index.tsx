import React, { useState } from 'react';
import { Accordion, Header } from 'semantic-ui-react';
import GeneralSettings from './GeneralSettings';
import ModelEditorSettings from './ModelEditorSettings';
import '../../styles/settings.css'

const Settings: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <>
      <Header as="h1" inverted className="settings-title">
        Settings
      </Header>

      <Accordion inverted>
        <GeneralSettings activeIndex={activeIndex} handleAccordionClick={handleAccordionClick} />
        <ModelEditorSettings activeIndex={activeIndex} handleAccordionClick={handleAccordionClick} />
      </Accordion>
    </>
  );
};

export default Settings;
