import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';

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
        <Button basic size="tiny" icon
          onClick={(e) => {
            e.stopPropagation();
            setProductToDelete(product.id);
            setOpenConfirm(true);
          }}
        >
          <Icon color="red" name="trash" />
        </Button>
      }
      content={`Delete product "${product.name}"`}
    />
  );
};

export default TableCellActionsDelete;
