import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import '../../styles/products.css';

const Empty: React.FC = () => {
  /**
   * tsx
   */
  return (
    <Table.Row data-testid="empty-row">
      <Table.Cell colSpan="8" textAlign="center" data-testid="empty-cell">
        <h3 className="products-empty-message-header" data-testid="empty-header">
          It's quiet here 💤
        </h3>
        <div className="products-empty-message-body" data-testid="empty-body">
          Let's get productive by clicking <Label data-testid="add-product-label">+ Add Product</Label>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export default Empty;
