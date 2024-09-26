import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const useKeysPreventDefault = () => {
  const { actorModalOpen, systemModalOpen, zoneModalOpen, dataflowModalOpen } =
    useSelector((state: RootState) => state.modelEditor);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.metaKey &&
        (event.key === '+' ||
          event.key === '-' ||
          event.key === 's' ||
          event.key === 'a')
      ) {
        event.preventDefault();
      }

      if (
        event.metaKey &&
        event.key === ' ' &&
        !actorModalOpen &&
        !systemModalOpen &&
        !zoneModalOpen &&
        !dataflowModalOpen
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [actorModalOpen, systemModalOpen, zoneModalOpen, dataflowModalOpen]);
};

export default useKeysPreventDefault;
