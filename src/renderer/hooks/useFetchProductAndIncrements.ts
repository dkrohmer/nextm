import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchProduct } from '../services/api/products';
import { fetchIncrements } from '../services/api/increments';
import { setIncrementsActiveIndex } from '../store/increments';

const useFetchProductAndIncrements = (productId: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (productId) {
      dispatch(setIncrementsActiveIndex(-1));
      dispatch(fetchProduct({ productId, isEagerLoading: false }));
      dispatch(fetchIncrements({ productId }));
    }
  }, [productId, dispatch]);
};

export default useFetchProductAndIncrements;
