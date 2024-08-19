import React from 'react';
import { Table, Label, Icon, Popup } from 'semantic-ui-react';
import { IResponsible } from '../../interfaces/IResponsible';

interface TableCellResponsibleProps {
  responsibles: IResponsible[] | undefined;
}

const TableCellResponsible: React.FC<TableCellResponsibleProps> = ({ responsibles = [] }) => {
  /**
   * Format responsibles into a string for the popup content
   */
  const formatResponsibles = (responsibles: IResponsible[]): string => {
    return responsibles.map(responsible => 
      `${responsible.firstName} ${responsible.lastName}${responsible.role ? ` (${responsible.role})` : ''}`
    ).join(', ');
  };

  /**
   * tsx
   */
  return (
    <Popup
      trigger={
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
      }
      content={formatResponsibles(responsibles)}
      position="top center"
      hoverable
    />
  );
}

export default TableCellResponsible;
