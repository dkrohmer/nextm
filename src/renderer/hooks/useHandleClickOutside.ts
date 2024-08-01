import { useEffect, RefObject } from 'react';
import { useDispatch } from 'react-redux';
import { setSidebarVisible } from '../store/settings';
import { AppDispatch } from '../store';

const useHandleClickOutside = (ref: RefObject<HTMLDivElement>) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        dispatch(setSidebarVisible(false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, ref]);
};

export default useHandleClickOutside;
