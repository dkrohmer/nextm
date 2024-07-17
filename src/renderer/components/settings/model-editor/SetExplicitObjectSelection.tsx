import React from 'react';
import { Form, Icon, Popup, Checkbox } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { showToast, setExplicitObjectSelection } from '../../../store/SettingsStore';

const SetExplicitObjectSelection: React.FC = () => {
  const { explicitObjectSelection } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleExplicitObjectSelectionChange = () => {
    window.electron.setExplicitObjectSelection(!explicitObjectSelection);
    dispatch(setExplicitObjectSelection(!explicitObjectSelection));
    dispatch(
      showToast({
        promise: Promise.resolve(),
        loadingMessage: '',
        successMessage: `Explicit object selection ${!explicitObjectSelection ? 'active' : 'inactive'}`,
        errorMessage: '',
      })
    );
  };

  return (
    <Form inverted>
      <div>
        <h3 style={{ display: 'inline-block' }}>
          <label>Set explicit object selection</label>
        </h3>
        <Popup
          trigger={
            <Icon
              name="info circle"
              style={{ display: 'inline-block', paddingLeft: '10px' }}
              inverted
            />
          }
          content="If explicit object selection is active, you cannot context-click an object unless it has previously been selected with a left mouse click."
        />
      </div>
      <Form.Field>
        <Checkbox
          label={explicitObjectSelection ? 'Active' : 'Inactive'}
          checked={explicitObjectSelection}
          onChange={handleExplicitObjectSelectionChange}
        />
      </Form.Field>
    </Form>
  );
};

export default SetExplicitObjectSelection;
