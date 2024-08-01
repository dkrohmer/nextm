import React from 'react';
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
  <div className="products-action-icons">
    <TableCellActionsEdit product={product} />
    <TableCellActionsClone product={product} />
    <TableCellActionsDelete
      product={product}
      setProductToDelete={setProductToDelete}
      setOpenConfirm={setOpenConfirm}
    />
  </div>
);

export default TableCellActions;
