import { AppDispatch } from '../../store';
import { setExplicitObjectSelection, showToast } from '../../store/settings';

export const handleExplicitObjectSelectionChange = (
  explicitObjectSelection: boolean,
  dispatch: AppDispatch
) => {
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
