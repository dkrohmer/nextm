import React from 'react';
import { Image } from 'semantic-ui-react';
import defaultThumbnail from '../../../../assets/thumbnail.png';

interface ModelThumbnailProps {
  thumbnail?: string | null;
}

const ModelThumbnail: React.FC<ModelThumbnailProps> = ({ thumbnail }) => (
  <Image
    src={thumbnail || defaultThumbnail}
    className="model-thumbnail"
  />
);

export default ModelThumbnail;
