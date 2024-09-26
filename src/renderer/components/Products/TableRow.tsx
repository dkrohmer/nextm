import React from 'react';
import { Table } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import TableCellName from './TableCellName';
import TableCellDescription from './TableCellDescription';
import TableCellResponsible from './TableCellResponsible';
import TableCellDeadline from './TableCellDeadline';
import TableCellCreated from './TableCellCreatedAt';
import TableCellActions from './TableCellActions';

interface TableRowProps {
  product: IProduct;
}

const ProductsTableRow: React.FC<TableRowProps> = ({ product }) => {
  /**
   * tsx
   */
  return (
    <Table.Row className="clickable-row">
      <TableCellName
        name={product.name}
        productId={product.id}
        data-testid="name"
      />
      <TableCellDescription
        description={product.description}
        data-testid="description"
      />
      <TableCellResponsible
        responsibles={product.responsibles}
        data-testid="responsibles"
      />
      <TableCellDeadline endsAt={product.endsAt} data-testid="deadline" />
      <TableCellCreated createdAt={product.createdAt} data-testid="createdAt" />
      <TableCellActions product={product} />
    </Table.Row>
  );
};

export default ProductsTableRow;
