import React from 'react';
import { Table, Label, Icon, Popup } from 'semantic-ui-react';
import { IResponsible } from '../../interfaces/IResponsible';

interface TableCellResponsibleProps {
  responsibles: IResponsible[] | undefined;
}

const TableCellResponsible: React.FC<TableCellResponsibleProps> = ({ responsibles = [] }) => {
  /**
   * handlers
   */
  const renderResponsibles = () => {
    if (responsibles.length === 0) {
      return 'n/a';
    } else if (responsibles.length === 1) {
      const responsible = responsibles[0];
      return (
        <Label
          size="tiny"
          className="products-table-responsibles-cell-label"
          data-testid={`responsible-label-${responsible.id}`}
        >
          <Icon name="user" />
          {`${responsible.firstName} ${responsible.lastName}${responsible.role ? ` (${responsible.role})` : ''}`}
        </Label>
      );
    } else {
      const firstResponsible = responsibles[0];
      const additionalCount = responsibles.length - 1;
      return (
        <div className="responsibles-container" data-testid="responsibles-container">
          <Label
            size="tiny"
            className="products-table-responsibles-cell-label"
            data-testid={`responsible-label-${firstResponsible.id}`}
          >
            <Icon name="user" />
            {`${firstResponsible.firstName} ${firstResponsible.lastName}${firstResponsible.role ? ` (${firstResponsible.role})` : ''}`}
          </Label>
          <span className="more-responsibles" data-testid="more-responsibles"> + {additionalCount} more</span>
        </div>
      );
    }
  };

  const truncateString = (str: string | undefined, maxLength: number) => {
    if (!str) return '';
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
  };

  const renderPopupContent = () => {
    if (responsibles.length === 0) {
      return 'n/a';
    }

    let totalLength = 0;
    const responsibleElements = [];
    let displayedCount = 0;

    for (const responsible of responsibles) {
      const fullName = `${truncateString(responsible.firstName, 20)} ${truncateString(responsible.lastName, 20)}${responsible.role ? ` (${truncateString(responsible.role, 30)})` : ''}`;
      totalLength += fullName.length;

      if (totalLength > 300 || displayedCount >= 15) {
        break;
      }

      responsibleElements.push(
        <div key={responsible.id} data-testid={`popup-responsible-${responsible.id}`}>
          <Icon name="user" />
          {fullName}
        </div>
      );
      displayedCount++;
    }

    if (responsibles.length > displayedCount) {
      return (
        <div>
          {responsibleElements}
          <div data-testid="popup-more-responsibles">... and {responsibles.length - displayedCount} more</div>
        </div>
      );
    }

    return <div>{responsibleElements}</div>;
  };

  /**
   * tsx
   */
  return (
    <Popup
      trigger={
        <Table.Cell data-testid="table-cell">
          <div className="products-table-responsibles-cell products-ellipsis">
            {renderResponsibles()}
          </div>
        </Table.Cell>
      }
      content={renderPopupContent}
      position="top center"
      data-testid="responsibles-popup"
    />
  );
};

export default TableCellResponsible;
