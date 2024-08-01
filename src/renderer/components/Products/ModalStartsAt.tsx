import React from 'react';
import { Form } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { handleInputChange } from '../../utils/productsHandlers';
import { formatDate } from '../../utils/formatters';

const ModalStartsAt: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  return (
    <Form.Input
      type="date"
      label="Product start"
      value={formatDate(productsCurrentProduct?.startsAt || '')}
      onChange={(e) => handleInputChange(e, 'startsAt', productsCurrentProduct, dispatch)}
    />
  );
};

export default ModalStartsAt;
