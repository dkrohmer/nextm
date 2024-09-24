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
          data-testid="delete-button"
        >
          <Icon color="red" name="trash" />
        </Button>
      }
      content={<span data-testid="delete-popup-content"><strong>Delete product</strong> "{product.name}"</span>}
    />
  );
};

export default TableCellActionsDelete;
