import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../store';
import { fetchProduct } from '../services/api/products';
import { fetchIncrements } from '../services/api/increments';
import { setIncrementsActiveIndex } from '../store/increments';

const useDefaultDatabase = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (productId) {
      dispatch(setIncrementsActiveIndex(-1));
      dispatch(fetchProduct({ productId, isEagerLoading: false }));
      dispatch(fetchIncrements({ productId }));
    }
  }, []);
};

export default useDefaultDatabase;
