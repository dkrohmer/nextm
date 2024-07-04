import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Form } from 'semantic-ui-react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';

import { IModel } from '../../interfaces/IModel';
import {
  fetchModel,
  fetchModels,
  addOrUpdateModel,
  setModelsModalOpen,
  setModelsIsEditing,
  setModelsIsCloning,
  setModelsCurrentModel,
} from '../../store/ModelsStore';

const ModelsModal: React.FC = () => {
  const { incrementId } = useParams<{ incrementId: string }>();

  const dispatch = useDispatch<AppDispatch>();

  // global redux states
  const {
    modelsIsEditing,
    modelsModalOpen,
    modelsCurrentModel,
    modelsIsCloning,
  } = useSelector((state: RootState) => state.models);

  // const [newModel, setNewModel] = useState<IModel>({
  //   id: '',
  //   name: '',
  //   createdAt: '',
  //   incrementId: '',
  // });

  // useEffect(() => {
  //   if (incrementId && modelsModalOpen) {
  //     if (modelsIsEditing && modelsCurrentModel) {
  //       // Populate the form fields with currentModel data
  //       setNewModel(modelsCurrentModel);
  //     } else {
  //       setNewModel({
  //         id: '',
  //         name: '',
  //         createdAt: '',
  //         incrementId: '', // Assuming you have this in your form state
  //       });
  //     }
  //   }
  // }, [modelsModalOpen, modelsIsEditing, modelsCurrentModel]);

  // const handleSubmit = async () => {
  //   if (incrementId) {
  //     await dispatch(addOrUpdateModel({ model: newModel, incrementId }));
  //     dispatch(fetchModels({ incrementId }));
  //     dispatch(setModelsModalOpen(false));
  //   }
  // };

  const handleClose = () => {
    dispatch(setModelsModalOpen(false));
    dispatch(setModelsCurrentModel(null)); // Clear the increment to clone
    dispatch(setModelsIsEditing(false));
    dispatch(setModelsIsCloning(false));
  };

  const handleSubmit = async () => {
    if (modelsCurrentModel && incrementId) {
      let model: IModel;

      if (modelsIsCloning) {
        const cloneResponse = await dispatch(
          fetchModel({ modelId: modelsCurrentModel.id, isEagerLoading: true }),
        );
        if (fetchModel.fulfilled.match(cloneResponse)) {
          const eagerModel: IModel = cloneResponse.payload;
          model = { ...eagerModel, id: '', name: `${modelsCurrentModel.name}` };
        } else {
          // Handle the case where cloning fails
          // console.error('Cloning failed');
          return;
        }
      } else {
        model = modelsCurrentModel;
      }
      await dispatch(addOrUpdateModel({ model, incrementId }));
      dispatch(fetchModels({ incrementId }));
    }
    handleClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    if (modelsCurrentModel) {
      dispatch(
        setModelsCurrentModel({ ...modelsCurrentModel, [key]: e.target.value }),
      );
    }
  };

  const modalHeader = modelsIsCloning
    ? 'Clone Model'
    : modelsIsEditing
      ? 'Edit Model'
      : 'Add Model';
  const submitButtonText = modelsIsCloning
    ? 'Clone'
    : modelsIsEditing
      ? 'Edit'
      : 'Add';

  return (
    <Modal open={modelsModalOpen} onClose={handleClose} dimmer="blurring">
      <Modal.Header>{modalHeader}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Name"
            placeholder="Threat Model Name"
            // value={newModel.name}
            value={modelsCurrentModel?.name}
            autoFocus
            required
            onChange={(e) => handleInputChange(e, 'name')}
          />
          {/* Add additional inputs for start, end, deadline, and state */}
          <Form.Group className="form-button-group">
            <Form.Button primary type="submit">
              {submitButtonText}
            </Form.Button>
            <Form.Button className="cancel-button" onClick={handleClose}>
              Cancel
            </Form.Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ModelsModal;
