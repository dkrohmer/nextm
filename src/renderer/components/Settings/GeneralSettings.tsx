import React from 'react';
import { Accordion, Icon, Segment } from 'semantic-ui-react';
import DatabaseType from './DatabaseType';
import '../../styles/settings.css'

interface GeneralSettingsProps {
  activeIndex: number;
  handleAccordionClick: (index: number) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ activeIndex, handleAccordionClick }) => {
  const index = 0;

  return (
    <Segment basic>
      <Segment inverted className="settings">
        <Accordion.Title active={activeIndex === index} index={index} onClick={() => handleAccordionClick(index)}>
          <h2>
            <Icon name={`caret ${activeIndex === index ? `down` : `right`}`} />
            General Settings
          </h2>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <Segment basic>
            <DatabaseType />
          </Segment>
        </Accordion.Content>
      </Segment>
    </Segment>
  );
};

export default GeneralSettings;
