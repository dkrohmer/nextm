import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { setProductsCurrentProduct } from '../../store/products';

const ModalDescription: React.FC = () => {
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
  const handleDescriptionChange = (value: string) => {
    if (productsCurrentProduct) {
      dispatch(
        setProductsCurrentProduct({
          ...productsCurrentProduct,
          description: value,
        })
      );
    }
  };

  /**
   * tsx
   */
  return (
    <Form.TextArea
      label="Description"
      placeholder="Description"
      value={productsCurrentProduct?.description || ''}
      onChange={(_, data) => handleDescriptionChange(data.value as string)}
    />
  );
};

export default ModalDescription;
