import React from 'react';
import { Table, Popup } from 'semantic-ui-react';

interface TableCellDeadlineProps {
  endsAt: string | null | undefined;
}

const TableCellDeadline: React.FC<TableCellDeadlineProps> = ({ endsAt }) => {
  /**
   * handlers
   */
  const handleDateFormat = () => {
    return endsAt ? new Date(endsAt).toLocaleDateString() : 'n/a';
  };

  /**
   * tsx
   */
  return (
    <Popup
      trigger={
        <Table.Cell className="products-table-deadline-cell">
          {handleDateFormat()}
        </Table.Cell>
      }
      content={handleDateFormat}
      position="top center"
    />
  );
};

export default TableCellDeadline;
