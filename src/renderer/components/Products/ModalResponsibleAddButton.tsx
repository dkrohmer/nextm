import React from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { addResponsible } from '../../utils/responsibleHandlers';

const ModalResponsibleAddButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  return (
    <Button
      type="button"
      className="products-modal-add-responsible-button"
      onClick={() => addResponsible(productsCurrentProduct, dispatch)}
    >
      + Add Responsible
    </Button>
  );
};

export default ModalResponsibleAddButton;
