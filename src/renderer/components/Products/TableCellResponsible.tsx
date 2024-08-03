import React from 'react';
import { Table, Label, Icon } from 'semantic-ui-react';
import { IResponsible } from '../../interfaces/IResponsible';

interface TableCellResponsibleProps {
  responsibles: IResponsible[] | undefined;
}

const TableCellResponsible: React.FC<TableCellResponsibleProps> = ({ responsibles = [] }) => (
  <Table.Cell>
    <div className="products-table-responsibles-cell products-ellipsis">
      {responsibles.length > 0 ? responsibles.map((responsible, index) => (
        <React.Fragment key={responsible.id}>
          <Label size="tiny" className="products-table-responsibles-cell-label">
            <Icon name="user" />
            {`${responsible.firstName} ${responsible.lastName}${responsible.role ? ` (${responsible.role})` : ''}`}
          </Label>
          {index < responsibles.length - 1 && <span>, </span>}
        </React.Fragment>
      )) : 'n/a'}
    </div>
  </Table.Cell>
);

export default TableCellResponsible;
