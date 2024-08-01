import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { handleTrustLevelChange } from '../../utils/model-editor/zoneModalHandlers';

interface ZoneModalTrustLevelTrustedProps {
  zoneTrustLevel: string;
}

const ZoneModalTrustLevelTrusted: React.FC<ZoneModalTrustLevelTrustedProps> = ({ zoneTrustLevel }) => {
  const dispatch = useDispatch();

  return (
    <Form.Field>
      <Radio
        label="Trusted"
        name="radioGroup"
        value="trusted"
        checked={zoneTrustLevel === 'trusted'}
        onChange={() => handleTrustLevelChange('trusted', dispatch)}
      />
    </Form.Field>
  );
};

export default ZoneModalTrustLevelTrusted;
