import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as SemanticModal, Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { getModalHeader, getSubmitButtonText, handleClose, handleSubmit } from '../../utils/incrementsHandlers';
import IncrementsModalName from './ModalName';
import IncrementsModalCancelButton from './ModalCancelButton';
import IncrementsModalSubmitButton from './ModalSubmitButton';
import '../../styles/increments.css';

const Modal: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    incrementsModalOpen,
    incrementsIsEditing,
    incrementsIsCloning,
    currentIncrement,
  } = useSelector((state: RootState) => state.increments);

  return (
    <SemanticModal 
      open={incrementsModalOpen}
      onClose={() => handleClose(dispatch)}
      dimmer="blurring"
    >
      <SemanticModal.Header>{getModalHeader(incrementsIsCloning, incrementsIsEditing)}</SemanticModal.Header>
      <SemanticModal.Content>
        <Form onSubmit={() => handleSubmit(currentIncrement, incrementsIsCloning, productId, dispatch, navigate)}>
          <IncrementsModalName currentIncrement={currentIncrement} dispatch={dispatch} />
          <Form.Group>
            <IncrementsModalSubmitButton
              currentIncrement={currentIncrement}
              incrementsIsCloning={incrementsIsCloning}
              productId={productId}
              dispatch={dispatch}
              navigate={navigate}
              submitButtonText={getSubmitButtonText(incrementsIsCloning, incrementsIsEditing)}
            />
            <IncrementsModalCancelButton dispatch={dispatch} />
          </Form.Group>
        </Form>
      </SemanticModal.Content>
    </SemanticModal>
  );
};

export default Modal;
