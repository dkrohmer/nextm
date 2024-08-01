import React from 'react';
import { Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { handleResponsibleChange } from '../../utils/responsibleHandlers';
import { IResponsible } from '../../interfaces/IResponsible';

interface ProductsModalResponsibleRoleProps {
  index: number;
  responsible: IResponsible;
}

const ModalResponsibleRole: React.FC<ProductsModalResponsibleRoleProps> = ({ index, responsible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  return (
    <Form.Input
      placeholder="Role"
      value={responsible.role || ''}
      onChange={(e) =>
        handleResponsibleChange(
          index,
          'role',
          e.target.value,
          productsCurrentProduct,
          dispatch
        )
      }
    />
  );
};

export default ModalResponsibleRole;
