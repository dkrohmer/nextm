import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import ProductsModalResponsibleFirstName from './ModalResponsibleFirstName';
import ProductsModalResponsibleLastName from './ModalResponsibleLastName';
import ProductsModalResponsibleRole from './ModalResponsibleRole';
import ProductsModalResponsibleRemoveButton from './ModalResponsibleRemoveButton';
import ProductsModalResponsibleAddButton from './ModalResponsibleAddButton';

const ModalResponsible: React.FC = () => {
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  return (
    <div className="field">
      <label>Responsible(s)</label>
      {productsCurrentProduct?.responsibles?.map((responsible, index) => (
        <Form.Group width="equal" key={index}>
          <ProductsModalResponsibleFirstName index={index} responsible={responsible} />
          <ProductsModalResponsibleLastName index={index} responsible={responsible} />
          <ProductsModalResponsibleRole index={index} responsible={responsible} />
          <ProductsModalResponsibleRemoveButton index={index} />
        </Form.Group>
      ))}
      <ProductsModalResponsibleAddButton />
    </div>
  );
};

export default ModalResponsible;
