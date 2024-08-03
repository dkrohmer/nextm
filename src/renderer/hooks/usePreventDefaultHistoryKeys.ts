import { useEffect } from 'react';

const usePreventDefaultHistoryKeys = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        (event.key === 'ArrowLeft' || event.key === 'Backspace')
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};

export default usePreventDefaultHistoryKeys;
