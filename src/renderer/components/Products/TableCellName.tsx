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
    <Table.Cell>
      <div className="products-table-name-cell products-ellipsis">
        <a onClick={() => navigate(`/products/${productId}`)}>
          <b>{name}</b>
        </a>
      </div>
    </Table.Cell>
  );
};

export default TableCellName;
