import React from 'react';
import { Form, Icon, Popup } from 'semantic-ui-react';
import '../../styles/settings.css';
import GridTypeNone from './GridTypeNone';
import GridTypeDot from './GridTypeDot';
import GridTypeMesh from './GridTypeMesh';

const GridType: React.FC = () => {
  /**
   * tsx
   */
  return (
    <Form inverted>
      <div>
        <h3 className="settings-label" data-testid="settings-label">
          <label>Set grid type</label>
        </h3>
        <Popup
          trigger={
            <Icon
              name="info circle"
              inverted
              className="settings-info"
              data-testid="info-icon"
            />
          }
          content="Choose the type of grid for the model editor."
        />
      </div>
      <Form.Field>
        <GridTypeNone data-testid="grid-type-none" />
      </Form.Field>
      <Form.Field>
        <GridTypeDot data-testid="grid-type-dot" />
      </Form.Field>
      <Form.Field>
        <GridTypeMesh data-testid="grid-type-mesh" />
      </Form.Field>
    </Form>
  );
};

export default GridType;
