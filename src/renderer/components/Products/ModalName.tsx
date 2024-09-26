import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { setProductsCurrentProduct } from '../../store/products';

const ModalName: React.FC = () => {
  /**
   * global states
   */
  const { productsCurrentProduct } = useSelector(
    (state: RootState) => state.products,
  );

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    let { value } = e.target;

    if (value.length > 250) {
      value = value.slice(0, 249);
    }

    if (productsCurrentProduct) {
      dispatch(
        setProductsCurrentProduct({
          ...productsCurrentProduct,
          [key]: value,
        }),
      );
    }
  };

  /**
   * tsx
   */
  return (
    <Form.Input
      required
      autoFocus
      label="Name"
      placeholder="Product Name"
      value={productsCurrentProduct?.name || ''}
      onChange={(e) => handleInputChange(e, 'name')}
    />
  );
};

export default ModalName;
