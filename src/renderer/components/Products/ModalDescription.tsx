import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { handleDescriptionChange } from '../../utils/productsHandlers';

const ModalDescription: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  return (
    <Form.TextArea
      label="Description"
      placeholder="Description"
      value={productsCurrentProduct?.description || ''}
      onChange={(_, data) => handleDescriptionChange(data.value as string, productsCurrentProduct, dispatch)}
    />
  );
};

export default ModalDescription;
