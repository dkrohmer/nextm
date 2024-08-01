// ExplicitObjectSelection.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Icon, Popup, Checkbox } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { handleExplicitObjectSelectionChange } from '../../utils/settings/explicit-object-selection-handlers';
import '../../styles/settings.css';

const ExplicitObjectSelection: React.FC = () => {
  const { explicitObjectSelection } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch<AppDispatch>();

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
          onChange={() => handleExplicitObjectSelectionChange(explicitObjectSelection, dispatch)}
        />
      </Form.Field>
    </Form>
  );
};

export default ExplicitObjectSelection;
