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
      <TableCellName name={product.name} productId={product.id} />
      <TableCellDescription description={product.description} />
      <TableCellResponsible responsibles={product.responsibles} />
      <TableCellDeadline endsAt={product.endsAt} />
      <TableCellCreated createdAt={product.createdAt} />
      <TableCellActions
        product={product}
      />
    </Table.Row>
  )
}

export default ProductsTableRow;
