import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  setImportFileName,
  setImportJsonData,
  setImportError,
  setImportIsFileValid,
} from '../../store/modelEditor';

const useResetImportModalState = (isImportModalOpen: boolean) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isImportModalOpen) {
      dispatch(setImportFileName(null));
      dispatch(setImportJsonData(null));
      dispatch(setImportError(null));
      dispatch(setImportIsFileValid(false));
    }
  }, [isImportModalOpen, dispatch]);
};

export default useResetImportModalState;
