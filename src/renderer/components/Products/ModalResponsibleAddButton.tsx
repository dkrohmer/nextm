import React from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setProductsCurrentProduct } from '../../store/products';

const ModalResponsibleAddButton: React.FC = () => {
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
  const handleAddResponsible = () => {
    if (productsCurrentProduct) {
      const updatedResponsibles = [
        ...(productsCurrentProduct.responsibles || []),
        { id: '', firstName: '', lastName: '', role: '' },
      ];
      dispatch(
        setProductsCurrentProduct({
          ...productsCurrentProduct,
          responsibles: updatedResponsibles,
        }),
      );
    }
  };

  return (
    <Button
      type="button"
      className="products-modal-add-responsible-button"
      onClick={handleAddResponsible}
    >
      + Add Responsible
    </Button>
  );
};

export default ModalResponsibleAddButton;
