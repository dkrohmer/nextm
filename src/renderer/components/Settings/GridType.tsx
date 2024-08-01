import React from 'react';
import { Form, Icon, Popup } from 'semantic-ui-react';
import '../../styles/settings.css';
import GridTypeNone from './GridTypeNone';
import GridTypeDot from './GridTypeDot';
import GridTypeMesh from './GridTypeMesh';

const GridType: React.FC = () => {
  return (
    <Form inverted>
      <div>
        <h3 className="settings-label">
          <label>Set grid type</label>
        </h3>
        <Popup
          trigger={<Icon name="info circle" inverted className="settings-info" />}
          content="Choose the type of grid for the model editor."
        />
      </div>
      <Form.Field>
        <GridTypeNone />
      </Form.Field>
      <Form.Field>
        <GridTypeDot />
      </Form.Field>
      <Form.Field>
        <GridTypeMesh />
      </Form.Field>
    </Form>
  );
};

export default GridType;
