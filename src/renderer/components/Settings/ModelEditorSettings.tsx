import React from 'react';
import { Accordion, Form, Icon, Segment } from 'semantic-ui-react';
import SetGridType from './GridType';
import SetExplicitObjectSelection from './ExplicitObjectSelection';
import '../../styles/settings.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setActiveSettingsIndex } from '../../store/settings';

const index = 1;

const ModelEditorSettings: React.FC = () => {
  /**
   * global states
   */
  const activeSettingsIndex = useSelector((state: RootState) => state.settings.activeSettingsIndex);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleAccordionClick = (index: number) => {
    dispatch(setActiveSettingsIndex(activeSettingsIndex === index ? -1 : index));
  };

  /**
   * tsx
   */
  return (
    <Segment basic>
      <Segment inverted className="settings">
        <Accordion.Title active={activeSettingsIndex === index} index={index} onClick={() => handleAccordionClick(index)}>
          <h2>
            <Icon name={`caret ${activeSettingsIndex === index ? `down` : `right`}`} />
            Model Editor Settings
          </h2>
        </Accordion.Title>
        <Accordion.Content active={activeSettingsIndex === index}>
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
