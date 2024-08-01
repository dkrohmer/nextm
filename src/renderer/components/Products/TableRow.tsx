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
  setProductToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsTableRow: React.FC<TableRowProps> = ({
  product,
  setProductToDelete,
  setOpenConfirm,
}) => (
  <Table.Row className="clickable-row">
    <TableCellName name={product.name} productId={product.id} />
    <TableCellDescription description={product.description} />
    <TableCellResponsible responsibles={product.responsibles} />
    <TableCellDeadline endsAt={product.endsAt} />
    <TableCellCreated createdAt={product.createdAt} />
    <TableCellActions
      product={product}
      setProductToDelete={setProductToDelete}
      setOpenConfirm={setOpenConfirm}
    />
  </Table.Row>
);

export default ProductsTableRow;
