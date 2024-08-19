import React from 'react';
import { Table } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import TableCellActionsEdit from './TableCellActionsEdit';
import TableCellActionsClone from './TableCellActionsClone';
import TableCellActionsDelete from './TableCellActionsDelete';

interface TableCellActionsProps {
  product: IProduct;
}

const TableCellActions: React.FC<TableCellActionsProps> = ({ product }) => {
  /**
   * tsx
   */
  return (
    <Table.Cell className="products-table-actions-cell">
      <TableCellActionsEdit product={product} />
      <TableCellActionsClone product={product} />
      <TableCellActionsDelete product={product} />
    </Table.Cell>
  )
}

export default TableCellActions;
