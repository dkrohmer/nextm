import React from 'react';
import { Image } from 'semantic-ui-react';
import defaultThumbnail from '../../../../assets/thumbnail.png';
import useFetchVersionThumbnail from '../../hooks/useFetchVersionThumbnail';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ModelThumbnailProps {
  modelId: string;
}

const ModelThumbnail: React.FC<ModelThumbnailProps> = ({ modelId }) => {
  /**
   * global states
   */
  const thumbnail = useSelector((state: RootState) => state.versions.latestVersionThumbnails[modelId]);
  const isLoading = useSelector((state: RootState) => state.versions.latestVersionThumbnailsIsLoading[modelId]);
  const error = useSelector((state: RootState) => state.versions.latestVersionThumbnailsError[modelId]);

  /**
   * hooks
   */
  useFetchVersionThumbnail(modelId);

  /**
   * handlers
   */
  const handleThumbnail = () => {
    if (thumbnail && !isLoading && !error) {
      return thumbnail;
    } else {
      return defaultThumbnail
    }
  }

  /**
   * tsx
   */
  return (
    <Image
      src={handleThumbnail()}
      className="model-thumbnail"
    />
  );
}

export default ModelThumbnail;
