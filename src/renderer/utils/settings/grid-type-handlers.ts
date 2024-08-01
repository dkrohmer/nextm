import { AppDispatch } from '../../store';
import { setGridVisible, showToast } from '../../store/settings';

export const handleGridChange = (
  _: React.FormEvent<HTMLInputElement>,
  { value }: any,
  dispatch: AppDispatch
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
