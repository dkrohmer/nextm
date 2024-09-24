import React from 'react';
import { Form } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { formatDate } from '../../utils/formatters';
import { setProductsCurrentProduct } from '../../store/products';

const ModalStartsAt: React.FC = () => {
  /**
   * global states
   */
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    let value;
    if (!e.target.value) {
      value = null;
    } else {
      value = e.target.value;
    }
    
    if (productsCurrentProduct) {
      dispatch(
        setProductsCurrentProduct({
          ...productsCurrentProduct,
          [key]: value,
        })
      );
    }
  };

  /**
   * tsx
   */
  return (
    <Form.Input
      type="date"
      label="Product start"
      value={productsCurrentProduct?.startsAt ? formatDate(productsCurrentProduct.startsAt) : ''}
      onChange={(e) => handleInputChange(e, 'startsAt')}
      max={formatDate(productsCurrentProduct?.endsAt || '')}
      data-testid="product-starts-at-input"
    />
  );
};

export default ModalStartsAt;
