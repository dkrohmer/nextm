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
    <Table.Cell
      className="products-table-actions-cell"
      data-testid={`table-actions-${product.id}`}
    >
      <TableCellActionsEdit
        product={product}
        data-testid={`edit-action-${product.id}`}
      />
      <TableCellActionsClone
        product={product}
        data-testid={`clone-action-${product.id}`}
      />
      <TableCellActionsDelete
        product={product}
        data-testid={`delete-action-${product.id}`}
      />
    </Table.Cell>
  );
};

export default TableCellActions;
