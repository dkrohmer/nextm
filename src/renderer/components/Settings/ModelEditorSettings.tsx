import React from 'react';
import { Accordion, Form, Icon, Segment } from 'semantic-ui-react';
import SetGridType from './GridType';
import SetExplicitObjectSelection from './ExplicitObjectSelection';
import '../../styles/settings.css'

interface ModelEditorSettingsProps {
  activeIndex: number;
  handleAccordionClick: (index: number) => void;
}

const ModelEditorSettings: React.FC<ModelEditorSettingsProps> = ({ activeIndex, handleAccordionClick }) => {
  const index = 1;
  return (
    <Segment basic>
      <Segment inverted className="settings">
        <Accordion.Title active={activeIndex === index} index={index} onClick={() => handleAccordionClick(index)}>
          <h2>
            <Icon name={`caret ${activeIndex === index ? `down` : `right`}`} />
            Model Editor Settings
          </h2>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <Segment basic>
            <SetGridType />
            <Form inverted className="settings-form-padded">
              <SetExplicitObjectSelection />
            </Form>
          </Segment>
        </Accordion.Content>
      </Segment>
    </Segment>
  );
};

export default ModelEditorSettings;
