// modelsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { IModel } from '../interfaces/IModel';

interface ModelsState {
  // states related to models
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
  // states related to model
  model: IModel | null;
  modelIsLoading: boolean;
  modelIsLoaded: boolean;
  modelError: string | null;
}

const initialState: ModelsState = {
  // models initializers
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
  // model initializers
  model: null,
  modelIsLoading: false,
  modelIsLoaded: false,
  modelError: null,
};

// interfaces
interface FetchModelsArgs {
  incrementId: string;
}

interface FetchModelArgs {
  modelId: string;
  isEagerLoading: boolean;
}

interface AddOrUpdateModelArgs {
  model: IModel;
  incrementId: string;
}

// get all models
export const fetchModels = createAsyncThunk(
  'models/fetchModels',
  async ({ incrementId }: FetchModelsArgs, { rejectWithValue }) => {
    try {
      // const response = await fetch(`/api/models?incrementId=${incrementId}`);
      // const data = await response.json();
      const response = await window.electron.getAllModels({ incrementId });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// get one model
export const fetchModel = createAsyncThunk(
  'models/fetchModel',
  async ({ modelId, isEagerLoading }: FetchModelArgs, { rejectWithValue }) => {
    try {
      // const response = await axios.get<IModel>(`/api/models/${modelId}?eager=${isEagerLoading ? 'true' : 'false'}`);
      // return response.data;
      const response = await window.electron.getModelById({
        modelId,
        isEagerLoading,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Add or update a product
export const addOrUpdateModel = createAsyncThunk(
  'models/addOrUpdateModel',
  async ({ model, incrementId }: AddOrUpdateModelArgs, { rejectWithValue }) => {
    try {
      if (model.id) {
        // const response = await axios.put(`/api/models/${model.id}`, modelData);
        // return response.data;
        const response = await window.electron.updateModel({
          ...model,
          incrementId,
        });
        return response;
      }
      // const response = await axios.post('/api/models', modelData);
      // return response.data;
      const response = await window.electron.createModel({
        ...model,
        incrementId,
      });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to save product.');
    }
  },
);

// delete a model
export const deleteModel = createAsyncThunk(
  'models/deleteModel',
  async (modelId: string, { rejectWithValue }) => {
    try {
      // await axios.delete(`/api/models/${modelId}`);
      // return modelId;
      await window.electron.deleteModel({ modelId });
      return modelId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const modelsSlice = createSlice({
  name: 'models',
  initialState,
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
      // state.modelsIsEditing = !!action.payload;
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
        state.models = action.payload.models;
        state.modelsCount = action.payload.modelsCount;
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
      // cases for deleting a model
      .addCase(deleteModel.fulfilled, (state, action) => {
        state.models = state.models.filter(
          (model) => model.id !== action.payload,
        );
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
