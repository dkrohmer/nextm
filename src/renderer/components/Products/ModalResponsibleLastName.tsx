import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { IResponsible } from '../../interfaces/IResponsible';
import { setProductsCurrentProduct } from '../../store/products';

interface ModalResponsibleLastNameProps {
  index: number;
  responsible: IResponsible;
}

const ModalResponsibleLastName: React.FC<ModalResponsibleLastNameProps> = ({ index, responsible }) => {
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
    if (value.length > 250) {
      value = value.slice(0, 249);
    }
    
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
      placeholder="Last Name"
      value={responsible.lastName}
      onChange={(e) => handleResponsibleChange('lastName', e.target.value)}
    />
  );
};

export default ModalResponsibleLastName;
