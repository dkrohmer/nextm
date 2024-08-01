import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const useFocusContainer = (containerRef: React.RefObject<HTMLDivElement>) => {
  const { actorModalOpen, systemModalOpen, zoneModalOpen, dataflowModalOpen } =
    useSelector((state: RootState) => state.modelEditor);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const modalsOpen =
        actorModalOpen || systemModalOpen || dataflowModalOpen || zoneModalOpen;

      if (!modalsOpen) {
        containerRef.current.focus();
      }
    }
  }, [actorModalOpen, systemModalOpen, zoneModalOpen, dataflowModalOpen, containerRef]);
};

export default useFocusContainer;
