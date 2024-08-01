import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchModels } from '../services/api/models';

const useFetchModels = () => {
  const { incrementId } = useParams<{ incrementId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (incrementId) {
      dispatch(fetchModels({ incrementId }));
    }
  }, [dispatch, incrementId]);
};

export default useFetchModels;
