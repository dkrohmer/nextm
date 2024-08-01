import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { handleInputChange } from '../../utils/productsHandlers';
import { formatDate } from '../../utils/formatters';

const ModalEndsAt: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  return (
    <Form.Input
      type="date"
      label="Product end"
      value={formatDate(productsCurrentProduct?.endsAt || '')}
      onChange={(e) => handleInputChange(e, 'endsAt', productsCurrentProduct, dispatch)}
      min={formatDate(productsCurrentProduct?.startsAt || '')}
    />
  );
};

export default ModalEndsAt;
