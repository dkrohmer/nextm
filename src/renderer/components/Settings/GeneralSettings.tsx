import React from 'react';
import { Accordion, Icon, Segment } from 'semantic-ui-react';
import DatabaseType from './DatabaseType';
import '../../styles/settings.css'
import { setActiveSettingsIndex } from '../../store/settings';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

const index = 0;

const GeneralSettings: React.FC = () => {
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
            General Settings
          </h2>
        </Accordion.Title>
        <Accordion.Content active={activeSettingsIndex === index}>
          <Segment basic>
            <DatabaseType />
          </Segment>
        </Accordion.Content>
      </Segment>
    </Segment>
  );
};

export default GeneralSettings;
