import React from 'react';

interface ModelCreatedAtProps {
  createdAt: string;
}

const ModelCreatedAt: React.FC<ModelCreatedAtProps> = ({ createdAt }) => (
  <div>
    Created at: {new Date(createdAt).toLocaleString()}
  </div>
);

export default ModelCreatedAt;