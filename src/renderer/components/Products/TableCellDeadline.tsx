import React from 'react';
import { Table } from 'semantic-ui-react';

interface TableCellDeadlineProps {
  endsAt: string | null | undefined;
}

const TableCellDeadline: React.FC<TableCellDeadlineProps> = ({ endsAt }) => (
  <Table.Cell className="products-table-name-cell">
    {endsAt ? new Date(endsAt).toLocaleDateString() : 'n/a'}
  </Table.Cell>
);

export default TableCellDeadline;
