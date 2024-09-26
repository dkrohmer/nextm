import React from 'react';
import { useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { RootState } from '../../store';

const Error: React.FC = () => {
  /**
   * global states
   */
  const { productError } = useSelector((state: RootState) => state.products);

  /**
   * tsx
   */
  return productError ? (
    <Message
      negative
      className="product-error-message"
      data-testid="product-error"
    >
      <Message.Header>Error❗️</Message.Header>
      <p>{productError}</p>
    </Message>
  ) : null;
};

export default Error;
