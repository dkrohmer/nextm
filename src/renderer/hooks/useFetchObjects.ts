import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchProduct } from '../services/api/products';
import { fetchIncrement } from '../services/api/increments';
import { fetchModel } from '../services/api/models';
import { fetchLatestVersion } from '../services/api/versions';

const useFetchObjects = () => {
  const { productId, incrementId, modelId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (productId && incrementId && modelId) {
      dispatch(fetchProduct({ productId, isEagerLoading: false }));
      dispatch(fetchIncrement({ incrementId, isEagerLoading: false }));
      dispatch(fetchModel({ modelId, isEagerLoading: false }));
      dispatch(fetchLatestVersion({ modelId }));
    }
  }, [dispatch, productId, incrementId, modelId]);
};

export default useFetchObjects;
