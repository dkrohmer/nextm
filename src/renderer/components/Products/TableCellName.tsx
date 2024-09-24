import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Popup } from 'semantic-ui-react';
import '../../styles/products.css'

interface TableCellNameProps {
  name: string;
  productId: string;
}

const TableCellName: React.FC<TableCellNameProps> = ({ name, productId }) => {
  /**
   * hooks
   */
  const navigate = useNavigate();

  /**
   * tsx
   */
  return (
    <Popup
      trigger={
        <Table.Cell>
          <div className="products-table-name-cell products-ellipsis">
            <a onClick={() => navigate(`/products/${productId}`)}>
              <b>{name}</b>
            </a>
          </div>
        </Table.Cell>
      }
      content={name}
      position="top center"
    />
  );
};

export default TableCellName;
