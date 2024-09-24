import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { formatDate } from '../../utils/formatters';
import { setProductsCurrentProduct } from '../../store/products';

const ModalEndsAt: React.FC = () => {
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
      label="Product end"
      data-testid="product-ends-at-input"
      value={productsCurrentProduct?.endsAt ? formatDate(productsCurrentProduct.endsAt) : ''}
      onChange={(e) => handleInputChange(e, 'endsAt')}
      min={formatDate(productsCurrentProduct?.startsAt || '')}
    />
  );
};

export default ModalEndsAt;
