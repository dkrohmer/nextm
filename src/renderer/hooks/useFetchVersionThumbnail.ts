import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchLatestVersionThumbnail } from '../services/api/versions';

const useFetchVersionThumbnail = (modelId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (modelId) {
      dispatch(fetchLatestVersionThumbnail({ modelId }));
    }
  }, [dispatch, modelId]);
};

export default useFetchVersionThumbnail;
