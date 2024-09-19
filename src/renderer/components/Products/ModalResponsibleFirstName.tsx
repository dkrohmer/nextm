import React from 'react';
import { Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { IResponsible, IResponsibles } from '../../interfaces/IResponsible';
import products, { setProductsCurrentProduct } from '../../store/products';

interface ModalResponsibleFirstNameProps {
  index: number;
  responsible: IResponsible;
}

const ModalResponsibleFirstName: React.FC<ModalResponsibleFirstNameProps> = ({ index, responsible }) => {
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
      required
      placeholder="First Name"
      value={responsible.firstName}
      data-testid={`responsible-first-name-${index}`} 
      onChange={(e) => handleResponsibleChange('firstName', e.target.value)}
    />
  );
};

export default ModalResponsibleFirstName;
