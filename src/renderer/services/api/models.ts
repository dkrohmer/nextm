import { createAsyncThunk } from '@reduxjs/toolkit';
import { IModel } from '../../interfaces/IModel';

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

// Add or update a model
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
      return rejectWithValue('Failed to save model.');
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
