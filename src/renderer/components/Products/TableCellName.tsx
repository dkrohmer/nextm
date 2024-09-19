import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Popup } from 'semantic-ui-react';

interface TableCellNameProps {
  name: string;
  productId: string;
}

const TableCellName: React.FC<TableCellNameProps> = ({ name, productId }) => {
  /**
   * local states
   */
  const [popupOpen, setPopupOpen] = useState(false);

  /**
   * hooks
   */
  const navigate = useNavigate();

  /**
   * handlers
   */
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
          <div className="products-table-name-cell products-ellipsis">
            <a onClick={() => navigate(`/products/${productId}`)}>
              <b>{name}</b>
            </a>
          </div>
        </Table.Cell>
      }
      content={name}
      position="top center"
      hoverable
      open={popupOpen}
      onOpen={handleMouseEnter}
      onClose={handleMouseLeave}
    />
  );
};

export default TableCellName;
