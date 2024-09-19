import reducer, {
  initialModelsState,
  setModelsIsEditing,
  setModelsIsCloning,
  setModelsModalOpen,
  setModelsCurrentModel,
  setModelsConfirmOpen,
  setModelToDelete,
  ModelsState,
} from '../../../renderer/store/models';
import { fetchModels, fetchModel, addOrUpdateModel, deleteModel } from '../../../renderer/services/api/models';
import { IModel } from '../../../renderer/interfaces/IModel';

describe('modelsSlice', () => {
  let initialState: ModelsState;

  beforeEach(() => {
    initialState = { ...initialModelsState };
  });

  it('should handle setModelsIsEditing', () => {
    const state = reducer(initialState, setModelsIsEditing(true));
    expect(state.modelsIsEditing).toBe(true);
  });

  it('should handle setModelsIsCloning', () => {
    const state = reducer(initialState, setModelsIsCloning(true));
    expect(state.modelsIsCloning).toBe(true);
  });

  it('should handle setModelsModalOpen', () => {
    const state = reducer(initialState, setModelsModalOpen(true));
    expect(state.modelsModalOpen).toBe(true);
  });

  it('should handle setModelsCurrentModel', () => {
    const mockModel: IModel = { id: '1', name: 'Test Model', createdAt: '1', incrementId: '1'  }; // mock model object
    const state = reducer(initialState, setModelsCurrentModel(mockModel));
    expect(state.modelsCurrentModel).toEqual(mockModel);
  });

  it('should handle setModelsConfirmOpen', () => {
    const state = reducer(initialState, setModelsConfirmOpen(true));
    expect(state.modelsConfirmOpen).toBe(true);
  });

  it('should handle setModelToDelete', () => {
    const state = reducer(initialState, setModelToDelete('model-id'));
    expect(state.modelToDelete).toBe('model-id');
  });

  describe('extraReducers for async actions', () => {
    it('should handle fetchModels.pending', () => {
      const action = { type: fetchModels.pending.type };
      const state = reducer(initialState, action);
      expect(state.modelsIsLoading).toBe(true);
    });

    it('should handle fetchModels.fulfilled', () => {
      const mockModels: IModel[] = [{ id: '1', name: 'Model 1', createdAt: '1', incrementId: '1'  }, { id: '2', name: 'Model 2', createdAt: '2', incrementId: '2'  }];
      const action = { type: fetchModels.fulfilled.type, payload: mockModels };
      const state = reducer(initialState, action);
      expect(state.models).toEqual(mockModels);
      expect(state.modelsIsLoading).toBe(false);
    });

    it('should handle fetchModels.rejected', () => {
      const action = { type: fetchModels.rejected.type, payload: 'Error fetching models' };
      const state = reducer(initialState, action);
      expect(state.modelsIsLoading).toBe(false);
      expect(state.modelsError).toBe('Error fetching models');
    });

    it('should handle fetchModel.pending', () => {
      const action = { type: fetchModel.pending.type };
      const state = reducer(initialState, action);
      expect(state.modelIsLoading).toBe(true);
      expect(state.modelIsLoaded).toBe(false);
    });

    it('should handle fetchModel.fulfilled', () => {
      const mockModel: IModel = { id: '1', name: 'Model 1', createdAt: '1', incrementId: '1'  };
      const action = { type: fetchModel.fulfilled.type, payload: mockModel };
      const state = reducer(initialState, action);
      expect(state.model).toEqual(mockModel);
      expect(state.modelIsLoading).toBe(false);
      expect(state.modelIsLoaded).toBe(true);
    });

    it('should handle fetchModel.rejected', () => {
      const action = { type: fetchModel.rejected.type, payload: 'Error fetching model' };
      const state = reducer(initialState, action);
      expect(state.modelIsLoading).toBe(false);
      expect(state.modelIsLoaded).toBe(false);
      expect(state.modelError).toBe('Error fetching model');
    });

    it('should handle addOrUpdateModel.fulfilled with existing model', () => {
      const existingModel: IModel = { id: '1', name: 'Existing Model', createdAt: '1', incrementId: '1'  };
      const newModel: IModel = { id: '1', name: 'Updated Model' , createdAt: '1', incrementId: '1' };

      initialState.models = [existingModel];
      const action = { type: addOrUpdateModel.fulfilled.type, payload: newModel };
      const state = reducer(initialState, action);

      expect(state.models[0]).toEqual(newModel);
      expect(state.modelsModalOpen).toBe(false);
    });

    it('should handle addOrUpdateModel.fulfilled with new model', () => {
      const newModel: IModel = { id: '2', name: 'New Model', createdAt: '2', incrementId: '2'  };

      const action = { type: addOrUpdateModel.fulfilled.type, payload: newModel };
      const state = reducer(initialState, action);

      expect(state.models[0]).toEqual(newModel);
      expect(state.modelsModalOpen).toBe(false);
    });

    it('should handle addOrUpdateModel.rejected', () => {
      const action = { type: addOrUpdateModel.rejected.type, payload: 'Error adding/updating model' };
      const state = reducer(initialState, action);
      expect(state.modelsError).toBe('Error adding/updating model');
    });

    it('should handle deleteModel.fulfilled', () => {
      const existingModels: IModel[] = [{ id: '1', name: 'Model 1', createdAt: '1', incrementId: '1' }, { id: '2', name: 'Model 2', createdAt: '2', incrementId: '2'  }];

      initialState.models = existingModels;
      const action = { type: deleteModel.fulfilled.type, payload: '1' };
      const state = reducer(initialState, action);

      expect(state.models.length).toBe(1);
      expect(state.models[0].id).toBe('2');
      expect(state.modelsConfirmOpen).toBe(false);
    });

    it('should handle deleteModel.rejected', () => {
      const action = { type: deleteModel.rejected.type, payload: 'Error deleting model' };
      const state = reducer(initialState, action);
      expect(state.modelsError).toBe('Error deleting model');
      expect(state.modelsConfirmOpen).toBe(false);
    });
  });
});
