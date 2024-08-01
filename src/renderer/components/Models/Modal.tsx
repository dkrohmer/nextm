import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal as SemanticModal, Form } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ModalName from './ModalName';
import ModalSubmitButton from './ModalSubmitButton';
import ModalCancelButton from './ModalCancelButton';
import { getModalHeader } from '../../utils/modelsHandlers';

const Modal: React.FC = () => {
  const { incrementId } = useParams<{ incrementId: string }>();

  const {
    modelsIsEditing,
    modelsModalOpen,
    modelsCurrentModel,
    modelsIsCloning,
  } = useSelector((state: RootState) => state.models);

  return (
    <SemanticModal
      open={modelsModalOpen}
      dimmer="blurring"
    >
      <SemanticModal.Header>{getModalHeader(modelsIsCloning, modelsIsEditing)}</SemanticModal.Header>
      <SemanticModal.Content>
        <Form>
          <ModalName modelsCurrentModel={modelsCurrentModel} />
          <Form.Group className="form-button-group">
            <ModalSubmitButton
              modelsCurrentModel={modelsCurrentModel}
              modelsIsCloning={modelsIsCloning}
              modelsIsEditing={modelsIsEditing}
              incrementId={incrementId}
            />
            <ModalCancelButton />
          </Form.Group>
        </Form>
      </SemanticModal.Content>
    </SemanticModal>
  );
};

export default Modal;
