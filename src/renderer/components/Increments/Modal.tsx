import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as SemanticModal, Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import ModalName from './ModalName';
import ModalCancelButton from './ModalCancelButton';
import ModalSubmitButton from './ModalSubmitButton';
import '../../styles/increments.css';
import { IIncrement } from '../../interfaces/IIncrement';
import { addOrUpdateIncrement, fetchIncrement } from '../../services/api/increments';
import { setCurrentIncrement, setIncrementsIsCloning, setIncrementsIsEditing, setIncrementsModalOpen } from '../../store/increments';

const Modal: React.FC = () => {
  /**
   * global states
   */
  const {
    incrementsModalOpen,
    incrementsIsEditing,
    incrementsIsCloning,
    currentIncrement,
  } = useSelector((state: RootState) => state.increments);
  
  /**
   * hooks
   */
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /**
   * handlers
   */
  const handleSubmit = async () => {
    if (currentIncrement && productId) {
      let increment: IIncrement;
  
      if (incrementsIsCloning) {
        const cloneResponse = await dispatch(
          fetchIncrement({
            incrementId: currentIncrement.id,
            isEagerLoading: true,
          }),
        );
        if (fetchIncrement.fulfilled.match(cloneResponse)) {
          const eagerIncrement: IIncrement = cloneResponse.payload;
          increment = {
            ...eagerIncrement,
            id: '',
            name: `${currentIncrement.name}`,
          };
        } else {
          console.error('Cloning failed');
          return;
        }
      } else {
        increment = currentIncrement;
      }
  
      const response = await dispatch(
        addOrUpdateIncrement({ increment, productId }),
      );
      if (addOrUpdateIncrement.fulfilled.match(response)) {
        const responseIncrement: IIncrement = response.payload;
        navigate(`/products/${productId}/increments/${responseIncrement.id}`);
      }
    }
    handleClose();
  };

  const handleClose = () => {
    dispatch(setIncrementsModalOpen(false));
    dispatch(setCurrentIncrement(null));
    dispatch(setIncrementsIsCloning(false));
    dispatch(setIncrementsIsEditing(false));
  };

  const getModalHeader = () => (
    incrementsIsCloning
    ? 'Clone Increment'
    : incrementsIsEditing
      ? 'Edit Increment'
      : 'Add Increment'
  );

  /**
   * tsx
   */
  return (
    <SemanticModal open={incrementsModalOpen} onClose={handleClose} dimmer="blurring">
      <SemanticModal.Header>
        {getModalHeader()}
      </SemanticModal.Header>
      <SemanticModal.Content>
        <Form onSubmit={handleSubmit}>
          <ModalName />
          <Form.Group>
            <ModalSubmitButton />
            <ModalCancelButton />
          </Form.Group>
        </Form>
      </SemanticModal.Content>
    </SemanticModal>
  );
};

export default Modal;
