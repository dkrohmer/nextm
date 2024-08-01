import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIncrementsActiveIndex } from '../store/increments';

const useSetActiveIncrement = (
  incrementsIsLoaded: boolean,
  increments: any[],
  incrementId: string | undefined,
  productId: string | undefined
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (incrementsIsLoaded && increments.length > 0) {
      if (incrementId) {
        const index = increments.findIndex((inc) => inc.id === incrementId);
        if (index !== -1) {
          dispatch(setIncrementsActiveIndex(index));
        }
      } else {
        dispatch(setIncrementsActiveIndex(-1));
      }
    }
  }, [incrementsIsLoaded, incrementId, increments, dispatch]);
};

export default useSetActiveIncrement;
