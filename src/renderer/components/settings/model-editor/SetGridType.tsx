import React from 'react';
import { Form, Icon, Popup, Radio } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { showToast, setGridVisible } from '../../../store/SettingsStore';

const SetGridType: React.FC = () => {
  const { gridVisible } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();

  const handleGridChange = (
    _: React.FormEvent<HTMLInputElement>,
    { value }: any
  ) => {
    window.electron.setGridType(value);
    dispatch(setGridVisible(value));
    dispatch(
      showToast({
        promise: Promise.resolve(),
        loadingMessage: '',
        successMessage: `Grid type changed to: ${value}`,
        errorMessage: '',
      })
    );
  };

  return (
    <Form inverted>
      <div>
        <h3 style={{ display: 'inline-block' }}>
          <label>Set grid type</label>
        </h3>
        <Popup
          trigger={
            <Icon
              name="info circle"
              style={{ display: 'inline-block', paddingLeft: '10px' }}
              inverted
            />
          }
          content="Choose the type of grid for the model editor."
        />
      </div>
      <Form.Field>
        <Radio
          label="None"
          name="gridVisible"
          value="none"
          checked={gridVisible === 'none'}
          onChange={handleGridChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Dot"
          name="gridVisible"
          value="dot"
          checked={gridVisible === 'dot'}
          onChange={handleGridChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Mesh"
          name="gridVisible"
          value="mesh"
          checked={gridVisible === 'mesh'}
          onChange={handleGridChange}
        />
      </Form.Field>
    </Form>
  );
};

export default SetGridType;
