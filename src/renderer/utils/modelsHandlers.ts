import { AppDispatch } from '../store';
import { IModel } from '../interfaces/IModel';
import { deleteModel, fetchModel, fetchModels, addOrUpdateModel } from '../services/api/models';
import { 
  setModelsCurrentModel, 
  setModelsModalOpen, 
  setModelsIsEditing, 
  setModelsConfirmOpen,
  setModelsIsCloning,
} from '../store/models';

export const openAddModal = (dispatch: AppDispatch) => {
  dispatch(
    setModelsCurrentModel({
      id: '',
      name: '',
      createdAt: '',
      incrementId: '',
    }),
  );
  dispatch(setModelsModalOpen(true));
  dispatch(setModelsIsEditing(false));
};

export const confirmDelete = (modelToDelete: string | null, dispatch: AppDispatch) => {
  if (modelToDelete) {
    dispatch(deleteModel(modelToDelete));
  }
};

export const cancelDelete = (dispatch: AppDispatch) => {
  dispatch(setModelsConfirmOpen(false));
};

export const handleClose = (dispatch: AppDispatch) => {
    dispatch(setModelsModalOpen(false));
    dispatch(setModelsCurrentModel(null));
    dispatch(setModelsIsEditing(false));
    dispatch(setModelsIsCloning(false));
  };
  
  export const handleSubmit = async (
    modelsCurrentModel: IModel | null,
    modelsIsCloning: boolean,
    incrementId: string | undefined,
    dispatch: AppDispatch
  ) => {
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
  
  export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    modelsCurrentModel: IModel | null,
    dispatch: AppDispatch
  ) => {
    if (modelsCurrentModel) {
      dispatch(
        setModelsCurrentModel({ ...modelsCurrentModel, [key]: e.target.value })
      );
    }
  };

  export const getModalHeader = (modelsIsCloning: boolean, modelsIsEditing: boolean) => {
    if (modelsIsCloning) {
      return 'Clone Model';
    } else if (modelsIsEditing) {
      return 'Edit Model';
    } else {
      return 'Add Model';
    }
  };
  
  export const getSubmitButtonText = (modelsIsCloning: boolean, modelsIsEditing: boolean) => {
    if (modelsIsCloning) {
      return 'Clone';
    } else if (modelsIsEditing) {
      return 'Edit';
    } else {
      return 'Add';
    }
  };