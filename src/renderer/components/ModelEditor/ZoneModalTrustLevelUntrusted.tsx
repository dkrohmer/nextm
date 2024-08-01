import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { handleTrustLevelChange } from '../../utils/model-editor/zoneModalHandlers';

interface ZoneModalTrustLevelUntrustedProps {
  zoneTrustLevel: string;
}

const ZoneModalTrustLevelUntrusted: React.FC<ZoneModalTrustLevelUntrustedProps> = ({ zoneTrustLevel }) => {
  const dispatch = useDispatch();

  return (
    <Form.Field>
      <Radio
        label="Untrusted"
        name="radioGroup"
        value="untrusted"
        checked={zoneTrustLevel === 'untrusted'}
        onChange={() => handleTrustLevelChange('untrusted', dispatch)}
      />
    </Form.Field>
  );
};

export default ZoneModalTrustLevelUntrusted;
