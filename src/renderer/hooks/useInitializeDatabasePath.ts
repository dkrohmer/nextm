import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setInputPath, setUseDefaultDatabase } from '../store/settings';

const useInitializeDatabasePath = () => {
  const { path } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.electron.getDefaultDbPath().then((defaultPath: string) => {
      if (path === defaultPath) {
        dispatch(setUseDefaultDatabase(true));
        dispatch(setInputPath(defaultPath));
      } else {
        dispatch(setUseDefaultDatabase(false));
        dispatch(setInputPath(path));
      }
    });
  }, [path, dispatch, setUseDefaultDatabase, setInputPath]);
};

export default useInitializeDatabasePath;
