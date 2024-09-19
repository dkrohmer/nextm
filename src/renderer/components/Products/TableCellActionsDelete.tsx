import React, { useState } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import '../../styles/products.css';
import { setOpenConfirm, setProductToDelete } from '../../store/products';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

interface TableCellActionsDeleteProps {
  product: IProduct;
}

const TableCellActionsDelete: React.FC<TableCellActionsDeleteProps> = ({ product }) => {
  /**
   * local states
   */
  const [popupOpen, setPopupOpen] = useState(false);

  /**
   * hooksv
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setProductToDelete(product.id));
    dispatch(setOpenConfirm(true));
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
        <Button
          basic
          size="tiny"
          icon
          className="products-button"
          onClick={handleDelete}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Icon color="red" name="trash" />
        </Button>
      }
      content={<span><strong>Delete product</strong> "{product.name}"</span>}
      open={popupOpen}
      onClose={handleMouseLeave}
    />
  );
};

export default TableCellActionsDelete;
