import React from 'react';
import { Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { handleResponsibleChange } from '../../utils/responsibleHandlers';
import { IResponsible } from '../../interfaces/IResponsible';

interface ModalResponsibleFirstNameProps {
  index: number;
  responsible: IResponsible;
}

const ModalResponsibleFirstName: React.FC<ModalResponsibleFirstNameProps> = ({ index, responsible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  return (
    <Form.Input
      placeholder="First Name"
      value={responsible.firstName}
      onChange={(e) =>
        handleResponsibleChange(
          index,
          'firstName',
          e.target.value,
          productsCurrentProduct,
          dispatch
        )
      }
    />
  );
};

export default ModalResponsibleFirstName;
