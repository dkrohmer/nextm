import React from 'react';
import { Message } from 'semantic-ui-react';

interface ErrorProps {
  productError: string | null;
}

const Error: React.FC<ErrorProps> = ({ productError }) => (
  productError ? (
    <Message negative className="product-error-message">
      <Message.Header>Error❗️</Message.Header>
      <p>{productError}</p>
    </Message>
  ) : null
);

export default Error;
