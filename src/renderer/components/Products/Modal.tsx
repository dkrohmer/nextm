import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal as SemanticModal, Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { handleSubmit, closeModal, handleModalHeader } from '../../utils/productsHandlers';
import ModalName from './ModalName';
import ModalDescription from './ModalDescription';
import ModalResponsible from './ModalResponsible';
import ModalStartsAt from './ModalStartsAt';
import ModalEndsAt from './ModalEndsAt';
import ModalSubmitButton from './ModalSubmitButton';
import ModalCancelButton from './ModalCancelButton';

const Modal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    productsIsCloning,
    productsModalOpen,
    productsCurrentProduct,
    productsIsEditing,
  } = useSelector((state: RootState) => state.products);

  return (
    <SemanticModal open={productsModalOpen} onClose={() => closeModal(dispatch)} dimmer="blurring">
      <SemanticModal.Header>
        {handleModalHeader(productsIsCloning, productsIsEditing)}
      </SemanticModal.Header>
      <SemanticModal.Content>
        <Form onSubmit={() => handleSubmit(productsCurrentProduct, productsIsCloning, dispatch)}>
          <ModalName />
          <ModalDescription />
          <ModalResponsible />
          <ModalStartsAt />
          <ModalEndsAt />
          <Form.Group className="products-modal-form-button-group">
            <ModalSubmitButton productsIsCloning={productsIsCloning} productsIsEditing={productsIsEditing} />
            <ModalCancelButton />
          </Form.Group>
        </Form>
      </SemanticModal.Content>
    </SemanticModal>
  );
};

export default Modal;
