import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import '../../styles/products.css'; // Ensure this path is correct based on your project structure

interface TableCellActionsDeleteProps {
  product: IProduct;
  setProductToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableCellActionsDelete: React.FC<TableCellActionsDeleteProps> = ({
  product,
  setProductToDelete,
  setOpenConfirm,
}) => {
  return (
    <Popup
      trigger={
        <Button
          basic
          size="tiny"
          icon
          className="products-button"
          onClick={(e) => {
            e.stopPropagation();
            setProductToDelete(product.id);
            setOpenConfirm(true);
          }}
        >
          <Icon color="red" name="trash" />
        </Button>
      }
      content={<span><strong>Delete product</strong> "{product.name}"</span>}
    />
  );
};

export default TableCellActionsDelete;
