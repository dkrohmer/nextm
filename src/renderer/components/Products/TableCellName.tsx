import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

interface TableCellNameProps {
  name: string;
  productId: string;
}

const TableCellName: React.FC<TableCellNameProps> = ({ name, productId }) => {
  const navigate = useNavigate();

  return (
    <Table.Cell className="products-table-cell-max-width products-ellipsis">
      <a onClick={() => navigate(`/products/${productId}`)}>
        <b>{name}</b>
      </a>
    </Table.Cell>
  );
};

export default TableCellName;
