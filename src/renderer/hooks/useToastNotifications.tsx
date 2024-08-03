import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { hideToast } from '../store/settings';
import '../styles/layout/toast-manager.css';

const useToastNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    toastVisible,
    toastPromise,
    toastLoadingMessage,
    toastSuccessMessage,
    toastErrorMessage,
  } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    if (toastVisible && toastPromise) {
      toast.dismiss();

      toast
        .promise(
          toastPromise,
          {
            loading: toastLoadingMessage,
            success: toastSuccessMessage,
            error: toastErrorMessage,
          },
          {
            className: 'toast-container',
          },
        )
        .finally(() => {
          dispatch(hideToast());
        });
    }
  }, [
    toastVisible,
    toastPromise,
    toastLoadingMessage,
    toastSuccessMessage,
    toastErrorMessage,
    dispatch,
  ]);
};

export default useToastNotifications;
