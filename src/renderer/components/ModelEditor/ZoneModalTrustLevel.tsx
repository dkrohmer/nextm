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
    <div className="field" data-testid="zone-trust-level">
      <label data-testid="zone-trust-level-label">Trust level</label>
      <Form.Group inline data-testid="zone-trust-level-options">
        <ZoneModalTrustLevelEmpty data-testid="trust-level-empty" />
        <ZoneModalTrustLevelUntrusted data-testid="trust-level-untrusted" />
        <ZoneModalTrustLevelTrusted data-testid="trust-level-trusted" />
      </Form.Group>
    </div>
  );
};

export default ZoneModalTrustLevel;
