import React from 'react';
import { Table } from 'semantic-ui-react';

interface TableCellCreatedProps {
  createdAt: string;
}

const TableCellCreated: React.FC<TableCellCreatedProps> = ({ createdAt }) => (
  <Table.Cell className="products-table-created-at-cell">
    {new Date(createdAt).toLocaleString()}
  </Table.Cell>
);

export default TableCellCreated;
