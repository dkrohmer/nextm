import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { hideToast } from '../store/SettingsStore'; // Adjust the import path as necessary

export const ToastManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    toastVisible, 
    toastPromise, 
    toastLoadingMessage, 
    toastSuccessMessage, 
    toastErrorMessage 
  } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    if (toastVisible && toastPromise) {
      // Dismiss any existing toasts before showing a new one
      toast.dismiss();

      toast.promise(
        toastPromise,
        {
          loading: toastLoadingMessage,
          success: toastSuccessMessage,
          error: toastErrorMessage,
        },
        {
          style: {
            background: '#1b1c1d', // Background color for inverted theme
            color: '#ffffff', // Text color for inverted theme
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)', // Shadow similar to Semantic UI
            borderRadius: '0.28571429rem', // Border radius similar to Semantic UI
            border: '0.5px white solid'
          },
        }
      ).finally(() => {
        dispatch(hideToast());
      });
    }
  }, [toastVisible, toastPromise, toastLoadingMessage, toastSuccessMessage, toastErrorMessage, dispatch]);

  return <Toaster position="top-center" toastOptions={{ style: { marginTop: '120px' } }} />;
};
