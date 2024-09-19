import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import { AppDispatch } from '../../store';
import '../../styles/products.css';
import { setProductsCurrentProduct, setProductsIsEditing, setProductsModalOpen } from '../../store/products';

interface TableCellActionsEditProps {
  product: IProduct;
}

const TableCellActionsEdit: React.FC<TableCellActionsEditProps> = ({ product }) => {
  /**
   * local states
   */
  const [popupOpen, setPopupOpen] = useState(false);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setProductsCurrentProduct(product));
    dispatch(setProductsModalOpen(true));
    dispatch(setProductsIsEditing(true));  
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
          onClick={handleEdit}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Icon name="pencil" />
        </Button>
      }
      content={<span><strong>Edit product</strong> "{product.name}"</span>}
      open={popupOpen}
      onClose={handleMouseLeave}
    />
  );
};

export default TableCellActionsEdit;
