import React from 'react';
import { Message, Table } from 'semantic-ui-react';

interface ProductsErrorProps {
  error: string;
}

const Error: React.FC<ProductsErrorProps> = ({ error }) => {
  /**
   * tsx
   */
  return (
    <Table.Row data-testid="error-row">
      <Table.Cell colSpan="8" textAlign="center" data-testid="error-cell">
        <Message negative data-testid="error-message">
          <Message.Header data-testid="error-header">Error❗️</Message.Header>
          <p data-testid="error-text">{error}</p>
        </Message>
      </Table.Cell>
    </Table.Row>
  );
};

export default Error;
