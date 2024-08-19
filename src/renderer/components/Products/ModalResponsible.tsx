import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store';
import ModalResponsibleFirstName from './ModalResponsibleFirstName';
import ModalResponsibleLastName from './ModalResponsibleLastName';
import ModalResponsibleRole from './ModalResponsibleRole';
import ModalResponsibleRemoveButton from './ModalResponsibleRemoveButton';
import ModalResponsibleAddButton from './ModalResponsibleAddButton';

const ModalResponsible: React.FC = () => {
  /**
   * global states
   */
  const { productsCurrentProduct } = useSelector((state: RootState) => state.products);

  /**
   * tsx
   */
  return (
    <div className="field">
      <label>Responsible(s)</label>
      {productsCurrentProduct?.responsibles?.map((responsible, index) => (
        <Form.Group width="equal" key={index}>
          <ModalResponsibleFirstName index={index} responsible={responsible} />
          <ModalResponsibleLastName index={index} responsible={responsible} />
          <ModalResponsibleRole index={index} responsible={responsible} />
          <ModalResponsibleRemoveButton index={index} />
        </Form.Group>
      ))}
      <ModalResponsibleAddButton />
    </div>
  );
};

export default ModalResponsible;
