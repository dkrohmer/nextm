import React from 'react';
import { Table } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import TableCellActionsEdit from './TableCellActionsEdit';
import TableCellActionsClone from './TableCellActionsClone';
import TableCellActionsDelete from './TableCellActionsDelete';

interface TableCellActionsProps {
  product: IProduct;
  setProductToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableCellActions: React.FC<TableCellActionsProps> = ({
  product,
  setProductToDelete,
  setOpenConfirm,
}) => (
  <Table.Cell className="products-table-actions-cell">
    <TableCellActionsEdit product={product} />
    <TableCellActionsClone product={product} />
    <TableCellActionsDelete
      product={product}
      setProductToDelete={setProductToDelete}
      setOpenConfirm={setOpenConfirm}
    />
  </Table.Cell>
);

export default TableCellActions;
