import React, { useState } from 'react';
import { Table, Label, Icon, Popup } from 'semantic-ui-react';
import { IResponsible } from '../../interfaces/IResponsible';

interface TableCellResponsibleProps {
  responsibles: IResponsible[] | undefined;
}

const TableCellResponsible: React.FC<TableCellResponsibleProps> = ({ responsibles = [] }) => {
  /**
   * local states
   */
  const [popupOpen, setPopupOpen] = useState(false);

  /**
   * handlers
   */
  const handleResponsiblesFormat = (responsibles: IResponsible[]): string => {
    console.log(responsibles)
    if (responsibles.length == 0) {
      return 'n/a';
    } else {
      return responsibles.map(responsible => 
        `${responsible.firstName} ${responsible.lastName}${responsible.role ? ` (${responsible.role})` : ''}`
      ).join(', ');
    }
  };

  const handleMouseEnter = () => {
    setPopupOpen(true)
  }

  const handleMouseLeave = () => {
    setPopupOpen(false)
  }

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
      content={() => handleResponsiblesFormat(responsibles)}
      position="top center"
      hoverable
      open={popupOpen}
      onOpen={handleMouseEnter}
      onClose={handleMouseLeave}
    />
  );
}

export default TableCellResponsible;
