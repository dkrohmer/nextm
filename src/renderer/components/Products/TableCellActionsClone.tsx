import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import { handleClone } from '../../utils/productsHandlers';
import { AppDispatch } from '../../store';

interface TableCellActionsCloneProps {
  product: IProduct;
}

const TableCellActionsClone: React.FC<TableCellActionsCloneProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Popup
      trigger={
        <Button
          basic
          size="tiny"
          icon
          onClick={(e) => handleClone(e, product, dispatch)}
        >
          <Icon name="clone" />
        </Button>
      }
      content={<span><strong>Clone product</strong> "{product.name}"</span>}
    />
  );
};

export default TableCellActionsClone;
