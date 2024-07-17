import React, { useState } from 'react';
import { Accordion, Header, Icon, Segment } from 'semantic-ui-react';
import GeneralSettings from './general/GeneralSettings';
import ModelEditorSettings from './model-editor/ModelEditorSettings';

const Settings: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <>
      <Header as="h1" inverted>
        Settings
      </Header>

      <Accordion inverted>

        {/* General settings */}
        <Segment
          inverted
          style={{ border: '0.5px solid gray', borderRadius: '4px' }}
        >
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={() => handleAccordionClick(0)}
          >
            <h2>
              <Icon name={`caret ${activeIndex === 0 ? `down` : `right`}`} />
              General settings
            </h2>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <GeneralSettings />
          </Accordion.Content>
        </Segment>

        {/* Model editor settings */}
        <Segment
          inverted
          style={{ border: '0.5px solid gray', borderRadius: '4px' }}
        >
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={() => handleAccordionClick(1)}
          >
            <h2>
              <Icon name={`caret ${activeIndex === 1 ? `down` : `right`}`} />
              Model Editor Settings
            </h2>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <ModelEditorSettings />
          </Accordion.Content>
        </Segment>
      </Accordion>
    </>
  );
};

export default Settings;
