import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { setZoneTrustLevel } from '../../store/modelEditor';
import { RootState } from '../../store';

const ZoneModalTrustLevelTrusted: React.FC = () => {
  /**
   * global states
   */
  const { zoneTrustLevel } = useSelector((state: RootState) => state.modelEditor);
  
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handlers
   */
  const handleTrustLevelChange = (value: string) => {
    dispatch(setZoneTrustLevel(value));
  };

  /**
   * tsx
   */
  return (
    <Form.Field>
      <Radio
        label="Trusted"
        name="radioGroup"
        value="trusted"
        checked={zoneTrustLevel === 'trusted'}
        onChange={() => handleTrustLevelChange('trusted')}
      />
    </Form.Field>
  );
};

export default ZoneModalTrustLevelTrusted;
