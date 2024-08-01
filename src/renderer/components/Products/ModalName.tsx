import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { handleInputChange } from '../../utils/productsHandlers';

const ModalName: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  return (
    <Form.Input
      required
      autoFocus
      label="Name"
      placeholder="Product Name"
      value={productsCurrentProduct?.name || ''}
      onChange={(e) => handleInputChange(e, 'name', productsCurrentProduct, dispatch)}
    />
  );
};

export default ModalName;
