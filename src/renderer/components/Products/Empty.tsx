import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import '../../styles/products.css';

const Empty: React.FC = () => (
  <Table.Row>
    <Table.Cell colSpan="8" textAlign="center">
      <h3 className="products-empty-message-header">It's quiet here 💤</h3>
      <div className="products-empty-message-body">
        Let's get productive by clicking <Label>+ Add Product</Label>
      </div>
    </Table.Cell>
  </Table.Row>
);

export default Empty;
