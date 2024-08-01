import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchLatestVersion } from '../services/api/versions';
import type { IModel } from '../interfaces/IModel';

const useFetchVersion = (model: IModel) => {
  const dispatch = useDispatch<AppDispatch>();

  const [localVersion, setLocalVersion] = useState<{ thumbnail: string | null }>({ thumbnail: null });
  const [isVersionLoading, setIsVersionLoading] = useState(false);
  const [versionError, setVersionError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        setIsVersionLoading(true);
        const version = await dispatch(fetchLatestVersion({ modelId: model.id })).unwrap();
        setLocalVersion({ thumbnail: version.thumbnail });
        setIsVersionLoading(false);
      } catch (err) {
        setVersionError('Failed to load version.');
        setIsVersionLoading(false);
      }
    };

    fetchVersion();
  }, [model, dispatch]);

  return { localVersion, isVersionLoading, versionError };
};

export default useFetchVersion;
