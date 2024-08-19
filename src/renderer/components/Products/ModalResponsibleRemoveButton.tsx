import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { setProductsCurrentProduct } from '../../store/products';

interface ModalResponsibleRemoveButtonProps {
  index: number;
}

const ModalResponsibleRemoveButton: React.FC<ModalResponsibleRemoveButtonProps> = ({ index }) => {
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
  const handleRemoveResponsible = () => {
    if (productsCurrentProduct) {
      const updatedResponsibles = productsCurrentProduct.responsibles?.filter((_, i) => i !== index) || [];
      
      dispatch(
        setProductsCurrentProduct({
          ...productsCurrentProduct,
          responsibles: updatedResponsibles.length ? updatedResponsibles : [],
        })
      );
    }
  };

  /**
   * tsx
   */
  return (
    <Button
      type="button"
      circular
      icon="times"
      onClick={handleRemoveResponsible}
    />
  );
};

export default ModalResponsibleRemoveButton;
