import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import { AppDispatch } from '../../store';
import '../../styles/products.css';
import {
  setProductsCurrentProduct,
  setProductsIsCloning,
  setProductsModalOpen,
} from '../../store/products';

interface TableCellActionsCloneProps {
  product: IProduct;
}

const TableCellActionsClone: React.FC<TableCellActionsCloneProps> = ({
  product,
}) => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleClone = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const cloneName = `${product.name} (Copy)`;

    const maxLength = 250;
    let finalName = cloneName;

    if (finalName.length > maxLength) {
      const remainingLength = maxLength - 10; // 10 for the "..." and " (Copy)"
      finalName = `...${product.name.slice(-remainingLength)} (Copy)`;
    }

    dispatch(setProductsIsCloning(true));
    dispatch(setProductsCurrentProduct({ ...product, name: finalName }));
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
          data-testid="clone-button"
        >
          <Icon name="clone" />
        </Button>
      }
      content={
        <span data-testid="clone-popup-content">
          <strong>Clone product</strong> "{product.name}"
        </span>
      }
    />
  );
};

export default TableCellActionsClone;
