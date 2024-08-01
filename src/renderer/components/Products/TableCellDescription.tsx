import React from 'react';
import { Table, Popup } from 'semantic-ui-react';

interface ProductsTableCellDescriptionProps {
  description: string | null | undefined;
}

const TableCellDescription: React.FC<ProductsTableCellDescriptionProps> = ({ description }) => (
  <Popup
    trigger={
      <Table.Cell className="products-table-description-cell products-ellipsis">
        {description || 'n/a'}
      </Table.Cell>
    }
    content={description || 'n/a'}
  />
);

export default TableCellDescription;
