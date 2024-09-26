import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import '../../styles/products.css';
import {
  setProductsCurrentProduct,
  setProductsIsEditing,
  setProductsModalOpen,
} from '../../store/products';

const Add: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleAdd = () => {
    dispatch(
      setProductsCurrentProduct({
        id: '',
        name: '',
        startsAt: '',
        endsAt: '',
        createdAt: '',
      }),
    );
    dispatch(setProductsModalOpen(true));
    dispatch(setProductsIsEditing(false));
  };

  /**
   * tsx
   */
  return (
    <div className="products-add-product-button">
      <Button onClick={handleAdd} primary>
        + Add Product
      </Button>
    </div>
  );
};

export default Add;
