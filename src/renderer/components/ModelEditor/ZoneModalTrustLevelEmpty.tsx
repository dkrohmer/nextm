import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { handleTrustLevelChange } from '../../utils/model-editor/zoneModalHandlers';

interface ZoneModalTrustLevelEmptyProps {
  zoneTrustLevel: string;
}

const ZoneModalTrustLevelEmpty: React.FC<ZoneModalTrustLevelEmptyProps> = ({ zoneTrustLevel }) => {
  const dispatch = useDispatch();

  return (
    <Form.Field>
      <Radio
        label="n/a"
        name="radioGroup"
        value=""
        checked={zoneTrustLevel === ''}
        onChange={() => handleTrustLevelChange('', dispatch)}
      />
    </Form.Field>
  );
};

export default ZoneModalTrustLevelEmpty;
