import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchProduct } from '../services/api/products';

const useFetchProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct({ productId, isEagerLoading: false }));
    }
  }, [productId, dispatch]);
};

export default useFetchProduct;
