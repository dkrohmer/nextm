import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useFocusOnSidebarChange = (
  containerRef: React.RefObject<HTMLDivElement>,
) => {
  const { sidebarVisible } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    if (!sidebarVisible && containerRef && containerRef.current) {
      containerRef.current.focus();
    }
  }, [sidebarVisible, containerRef]);
};

export default useFocusOnSidebarChange;
