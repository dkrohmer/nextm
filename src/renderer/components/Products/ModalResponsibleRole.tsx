import React from 'react';
import { Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { IResponsible } from '../../interfaces/IResponsible';
import { setProductsCurrentProduct } from '../../store/products';

interface ProductsModalResponsibleRoleProps {
  index: number;
  responsible: IResponsible;
}

const ModalResponsibleRole: React.FC<ProductsModalResponsibleRoleProps> = ({ index, responsible }) => {
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
  const handleResponsibleChange = (field: keyof IResponsible, value: string) => {
    if (productsCurrentProduct) {
      let updatedResponsibles: IResponsible[] = [];
      if (productsCurrentProduct.responsibles) {
        updatedResponsibles = productsCurrentProduct.responsibles.map((resp, i) =>
          i === index ? { ...resp, [field]: value } : resp
        )
      } 

      dispatch(
        setProductsCurrentProduct({
          ...productsCurrentProduct,
          responsibles: updatedResponsibles,
        })
      );
    }
  };

  /**
   * tsx
   */
  return (
    <Form.Input
      placeholder="Role"
      value={responsible.role || ''}
      onChange={(e) =>handleResponsibleChange('role', e.target.value)}
    />
  );
};

export default ModalResponsibleRole;
