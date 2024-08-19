import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import { AppDispatch } from '../../store';
import '../../styles/products.css';
import { setProductsCurrentProduct, setProductsIsCloning, setProductsModalOpen } from '../../store/products';

interface TableCellActionsCloneProps {
  product: IProduct;
}

const TableCellActionsClone: React.FC<TableCellActionsCloneProps> = ({ product }) => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleClone = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setProductsIsCloning(true));
    dispatch(
      setProductsCurrentProduct({ ...product, name: `${product.name} (Copy)` })
    );
    dispatch(setProductsModalOpen(true));
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
          onClick={handleClone}
        >
          <Icon name="clone" />
        </Button>
      }
      content={<span><strong>Clone product</strong> "{product.name}"</span>}
    />
  );
};

export default TableCellActionsClone;
