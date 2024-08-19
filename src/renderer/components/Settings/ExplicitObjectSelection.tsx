// ExplicitObjectSelection.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Icon, Popup, Checkbox } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import '../../styles/settings.css';
import { setExplicitObjectSelection, showToast } from '../../store/settings';

const ExplicitObjectSelection: React.FC = () => {
  /**
   * global states
   */
  const { explicitObjectSelection } = useSelector((state: RootState) => state.settings);
  
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
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

  /**
   * tsx
   */
  return (
    <Form inverted>
      <div>
        <h3 className="settings-label">
          <label>Set explicit object selection</label>
        </h3>
        <Popup
          trigger={
            <Icon
              name="info circle"
              inverted
              className="settings-info"
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

export default ExplicitObjectSelection;
