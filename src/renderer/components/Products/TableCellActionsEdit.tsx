import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import { openEditModal } from '../../utils/productsHandlers';
import { AppDispatch } from '../../store';

interface TableCellActionsEditProps {
  product: IProduct;
}

const TableCellActionsEdit: React.FC<TableCellActionsEditProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Popup
      trigger={
        <Button
          basic
          size="tiny"
          icon
          onClick={(e) => {
            e.stopPropagation();
            openEditModal(dispatch, product);
          }}
        >
          <Icon name="pencil" />
        </Button>
      }
      content={<span><strong>Edit product</strong> "{product.name}"</span>}
    />
  );
};

export default TableCellActionsEdit;
