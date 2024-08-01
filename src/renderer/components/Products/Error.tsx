import React from 'react';
import { Message, Table } from 'semantic-ui-react';

interface ProductsErrorProps {
  error: string;
}

const Error: React.FC<ProductsErrorProps> = ({ error }) => (
  <Table.Row>
    <Table.Cell colSpan="8" textAlign="center">
      <Message negative>
        <Message.Header>Error❗️</Message.Header>
        <p>{error}</p>
      </Message>
    </Table.Cell>
  </Table.Row>
);

export default Error;
