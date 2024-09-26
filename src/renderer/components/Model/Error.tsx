import React from 'react';
import { Message } from 'semantic-ui-react';

interface ModelErrorProps {
  error: string | null;
}

const ModelError: React.FC<ModelErrorProps> = ({ error }) => {
  /**
   * tsx
   */
  return error ? (
    <Message negative className="model-error-message">
      <Message.Header>Error❗️</Message.Header>
      <p>{error}</p>
    </Message>
  ) : null;
};

export default ModelError;
