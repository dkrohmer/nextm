import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal as SemanticModal, Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { IModel } from '../../interfaces/IModel';
import { addOrUpdateModel, fetchModel, fetchModels } from '../../services/api/models';
import { setModelsCurrentModel, setModelsIsCloning, setModelsIsEditing, setModelsModalOpen } from '../../store/models';
import ModalName from './ModalName';
import ModalSubmitButton from './ModalSubmitButton';
import ModalCancelButton from './ModalCancelButton';

const Modal: React.FC = () => {
  /**
   * global states
   */
  const {
    modelsIsEditing,
    modelsModalOpen,
    modelsIsCloning,
    modelsCurrentModel
  } = useSelector((state: RootState) => state.models);

  /**
   * hooks 
   */
  const { incrementId } = useParams<{ incrementId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleSubmit = async () => {
    if (modelsCurrentModel && incrementId) {
      let model: IModel;
  
      if (modelsIsCloning) {
        const cloneResponse = await dispatch(
          fetchModel({ modelId: modelsCurrentModel.id, isEagerLoading: true })
        );
        if (fetchModel.fulfilled.match(cloneResponse)) {
          const eagerModel: IModel = cloneResponse.payload;
          model = { ...eagerModel, id: '', name: `${modelsCurrentModel.name}` };
        } else {
          return;
        }
      } else {
        model = modelsCurrentModel;
      }
      await dispatch(addOrUpdateModel({ model, incrementId }));
      dispatch(fetchModels({ incrementId }));
    }
    handleClose(dispatch);
  };

  const handleClose = (dispatch: AppDispatch) => {
    dispatch(setModelsModalOpen(false));
    dispatch(setModelsCurrentModel(null));
    dispatch(setModelsIsEditing(false));
    dispatch(setModelsIsCloning(false));
  };

  const handleModalHeader = () => {
    if (modelsIsCloning) {
      return 'Clone Model';
    } else if (modelsIsEditing) {
      return 'Edit Model';
    } else {
      return 'Add Model';
    }
  };

  /**
   * tsx
   */
  return (
    <SemanticModal
      open={modelsModalOpen}
      dimmer="blurring"
    >
      <SemanticModal.Header>
        {handleModalHeader()}
      </SemanticModal.Header>
      <SemanticModal.Content>
        <Form onSubmit={handleSubmit}>
          <ModalName />
          <Form.Group className="form-button-group">
            <ModalSubmitButton />
            <ModalCancelButton />
          </Form.Group>
        </Form>
      </SemanticModal.Content>
    </SemanticModal>
  );
};

export default Modal;
