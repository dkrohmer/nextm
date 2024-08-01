import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { handleResponsibleChange } from '../../utils/responsibleHandlers';
import { IResponsible } from '../../interfaces/IResponsible';

interface ModalResponsibleLastNameProps {
  index: number;
  responsible: IResponsible;
}

const ModalResponsibleLastName: React.FC<ModalResponsibleLastNameProps> = ({ index, responsible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  return (
    <Form.Input
      placeholder="Last Name"
      value={responsible.lastName}
      onChange={(e) =>
        handleResponsibleChange(
          index,
          'lastName',
          e.target.value,
          productsCurrentProduct,
          dispatch
        )
      }
    />
  );
};

export default ModalResponsibleLastName;
