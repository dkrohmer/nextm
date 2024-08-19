import React from 'react';
import { useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { RootState } from '../../store';

interface ProductErrorProps {
  error: string;
}

const Error: React.FC<ProductErrorProps> = ({ error }) => {
  /**
   * tsx
   */
  return (
    error ? (
      <Message negative className="product-error-message">
        <Message.Header>Error❗️</Message.Header>
        <p>{error}</p>
      </Message>
    ) : null
  );
}

export default Error;
