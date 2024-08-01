import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';

const useInitializeDatabasePath = (
  setUseDefaultDatabase: (value: boolean) => void,
  setInputPath: (value: string) => void
) => {
  const { path } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.electron.getDefaultDbPath().then((defaultPath: string) => {
      if (path === defaultPath) {
        setUseDefaultDatabase(true);
        setInputPath(defaultPath);
      } else {
        setUseDefaultDatabase(false);
        setInputPath(path);
      }
    });
  }, [path, dispatch, setUseDefaultDatabase, setInputPath]);
};

export default useInitializeDatabasePath;
