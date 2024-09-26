import React from 'react';
import { Table } from 'semantic-ui-react';

const TableHeaders: React.FC = () => {
  /**
   * tsx
   */
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Responsible(s)</Table.HeaderCell>
        <Table.HeaderCell>Deadline</Table.HeaderCell>
        <Table.HeaderCell>Created at</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

export default TableHeaders;
