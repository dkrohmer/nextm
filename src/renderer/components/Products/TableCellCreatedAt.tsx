import React from 'react';
import { Table, Popup } from 'semantic-ui-react';

interface TableCellCreatedProps {
  createdAt: string;
}

const TableCellCreated: React.FC<TableCellCreatedProps> = ({ createdAt }) => {
  /**
   * handlers
   */
  const handleDataFormat = () => {
    return new Date(createdAt).toLocaleString();
  };

  /**
   * tsx
   */
  return (
    <Popup
      trigger={
        <Table.Cell className="products-table-created-at-cell">
          {handleDataFormat()}
        </Table.Cell>
      }
      content={handleDataFormat}
      position="top center"
    />
  );
};

export default TableCellCreated;
