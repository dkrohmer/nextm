import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openAddModal } from '../../utils/productsHandlers';
import { AppDispatch } from '../../store';
import '../../styles/products.css';

const Add: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="products-add-product-button">
      <Button onClick={() => openAddModal(dispatch)} primary>
        + Add Product
      </Button>
    </div>
  );
};

export default Add;
