import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { removeResponsible } from '../../utils/responsibleHandlers';

interface ModalResponsibleRemoveButtonProps {
  index: number;
}

const ModalResponsibleRemoveButton: React.FC<ModalResponsibleRemoveButtonProps> = ({ index }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  return (
    <Button
      type="button"
      circular
      icon="times"
      onClick={() => removeResponsible(index, productsCurrentProduct, dispatch)}
    />
  );
};

export default ModalResponsibleRemoveButton;
