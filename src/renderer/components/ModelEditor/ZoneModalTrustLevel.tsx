import React from 'react';
import { Form } from 'semantic-ui-react';
import ZoneModalTrustLevelEmpty from './ZoneModalTrustLevelEmpty';
import ZoneModalTrustLevelUntrusted from './ZoneModalTrustLevelUntrusted';
import ZoneModalTrustLevelTrusted from './ZoneModalTrustLevelTrusted';

interface ZoneModalTrustLevelProps {
  zoneTrustLevel: string;
}

const ZoneModalTrustLevel: React.FC<ZoneModalTrustLevelProps> = ({ zoneTrustLevel }) => {
  return (
    <div className="field">
      <label>Trust level</label>
      <Form.Group inline>
        <ZoneModalTrustLevelEmpty zoneTrustLevel={zoneTrustLevel} />
        <ZoneModalTrustLevelUntrusted zoneTrustLevel={zoneTrustLevel} />
        <ZoneModalTrustLevelTrusted zoneTrustLevel={zoneTrustLevel} />
      </Form.Group>
    </div>
  );
};

export default ZoneModalTrustLevel;
