import React from 'react';
import { Form } from 'semantic-ui-react';
import ZoneModalTrustLevelEmpty from './ZoneModalTrustLevelEmpty';
import ZoneModalTrustLevelUntrusted from './ZoneModalTrustLevelUntrusted';
import ZoneModalTrustLevelTrusted from './ZoneModalTrustLevelTrusted';

const ZoneModalTrustLevel: React.FC = () => {
  /**
   * tsx
   */
  return (
    <div className="field">
      <label>Trust level</label>
      <Form.Group inline>
        <ZoneModalTrustLevelEmpty />
        <ZoneModalTrustLevelUntrusted />
        <ZoneModalTrustLevelTrusted />
      </Form.Group>
    </div>
  );
};

export default ZoneModalTrustLevel;
