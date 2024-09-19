import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModel } from '../interfaces/IModel';
import { fetchModels, fetchModel, addOrUpdateModel, deleteModel } from '../services/api/models';

export interface ModelsState {
  models: IModel[];
  modelsCount: number;
  modelsIsLoading: boolean;
  modelsError: string | null;
  modelsModalOpen: boolean;
  modelsIsCloning: boolean;
  modelsIsEditing: boolean;
  modelsCurrentModel: IModel | null;
  modelsConfirmOpen: boolean;
  modelToDelete: string | null;
  model: IModel | null;
  modelIsLoading: boolean;
  modelIsLoaded: boolean;
  modelError: string | null;
}

export const initialModelsState: ModelsState = {
  models: [],
  modelsCount: 0,
  modelsIsLoading: false,
  modelsError: null,
  modelsModalOpen: false,
  modelsIsCloning: false,
  modelsIsEditing: false,
  modelsCurrentModel: null,
  modelsConfirmOpen: false,
  modelToDelete: null,
  model: null,
  modelIsLoading: false,
  modelIsLoaded: false,
  modelError: null,
};

const modelsSlice = createSlice({
  name: 'models',
  initialState: initialModelsState,
  reducers: {
    setModelsIsEditing(state, action: PayloadAction<boolean>) {
      state.modelsIsEditing = action.payload;
    },
    setModelsIsCloning(state, action: PayloadAction<boolean>) {
      state.modelsIsCloning = action.payload;
    },
    setModelsModalOpen(state, action: PayloadAction<boolean>) {
      state.modelsModalOpen = action.payload;
    },
    setModelsCurrentModel(state, action: PayloadAction<IModel | null>) {
      state.modelsCurrentModel = action.payload;
    },
    setModelsConfirmOpen(state, action) {
      state.modelsConfirmOpen = action.payload;
    },
    setModelToDelete(state, action) {
      state.modelToDelete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // cases for fetching all models
      .addCase(fetchModels.pending, (state) => {
        state.modelsIsLoading = true;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.models = action.payload;
        state.modelsIsLoading = false;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.modelsIsLoading = false;
        state.modelsError = action.payload as string;
      })
      // cases for fetching one model
      .addCase(fetchModel.pending, (state) => {
        state.modelIsLoading = true;
        state.modelIsLoaded = false;
        state.modelError = null;
      })
      .addCase(fetchModel.fulfilled, (state, action) => {
        state.model = action.payload;
        state.modelIsLoading = false;
        state.modelIsLoaded = true;
      })
      .addCase(fetchModel.rejected, (state, action) => {
        state.modelIsLoading = false;
        state.modelIsLoaded = false;
        state.modelError = action.payload as string;
      })
      .addCase(addOrUpdateModel.fulfilled, (state, action) => {
        const index = state.models.findIndex((model) => model.id === action.payload.id);
        if (index !== -1) {
          state.models[index] = action.payload;
        } else {
          state.models.unshift(action.payload);
        }
        state.modelsModalOpen = false;
      })
      .addCase(addOrUpdateModel.rejected, (state, action) => {
        state.modelsError = action.payload as string;
      })
      // cases for deleting a model
      .addCase(deleteModel.fulfilled, (state, action) => {
        state.models = state.models.filter((model) => model.id !== action.payload);
        state.modelsConfirmOpen = false;
      })
      .addCase(deleteModel.rejected, (state, action) => {
        state.modelsError = action.payload as string;
        state.modelsConfirmOpen = false;
      });
  },
});

export const {
  setModelsModalOpen,
  setModelsCurrentModel,
  setModelsIsCloning,
  setModelsIsEditing,
  setModelsConfirmOpen,
  setModelToDelete,
} = modelsSlice.actions;

export default modelsSlice.reducer;
