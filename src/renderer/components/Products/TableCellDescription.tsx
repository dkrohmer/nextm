import React from 'react';
import { Table, Popup } from 'semantic-ui-react';
import '../../styles/products.css'

interface ProductsTableCellDescriptionProps {
  description: string | null | undefined;
}

const TableCellDescription: React.FC<ProductsTableCellDescriptionProps> = ({ description }) => (
  <Popup
    trigger={
      <Table.Cell>
        <div className="products-table-description-cell products-ellipsis">
          {description || 'n/a'}
        </div>
      </Table.Cell>
    }
    content={description || 'n/a'}
  />
);

export default TableCellDescription;
