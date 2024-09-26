import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import {
  showToast,
  setDatabasePath,
  setGridVisible,
  setExplicitObjectSelection,
} from '../store/settings';

const useInitializeApp = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      const currentPath = await window.electron.getCurrentDbPath();
      dispatch(setDatabasePath(currentPath));
      dispatch(
        showToast({
          promise: Promise.resolve(),
          loadingMessage: '',
          successMessage: `Current database: ${currentPath}`,
          errorMessage: '',
        }),
      );
      const currentGridType = await window.electron.getGridType();
      dispatch(setGridVisible(currentGridType || 'none'));
      const explicitObjectSelection =
        await window.electron.getExplicitObjectSelection();
      dispatch(setExplicitObjectSelection(explicitObjectSelection || false));
    };
    fetchData();
  }, [dispatch]);
};

export default useInitializeApp;
