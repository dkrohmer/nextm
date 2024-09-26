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

/**
 * get all models
 */
export const fetchModels = createAsyncThunk(
  'models/fetchModels',
  async ({ incrementId }: FetchModelsArgs, { rejectWithValue }) => {
    try {
      const response = await window.electron.getAllModels({ incrementId });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to load models.');
    }
  },
);

/**
 * get one model
 */
export const fetchModel = createAsyncThunk(
  'models/fetchModel',
  async ({ modelId, isEagerLoading }: FetchModelArgs, { rejectWithValue }) => {
    try {
      const response = await window.electron.getModelById({
        modelId,
        isEagerLoading,
      });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to load model.');
    }
  },
);

/**
 * add or update a model
 */
export const addOrUpdateModel = createAsyncThunk(
  'models/addOrUpdateModel',
  async ({ model, incrementId }: AddOrUpdateModelArgs, { rejectWithValue }) => {
    try {
      if (model.id) {
        const response = await window.electron.updateModel({
          ...model,
          incrementId,
        });
        return response;
      }
      const response = await window.electron.createModel({
        ...model,
        incrementId,
      });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to add or update model.');
    }
  },
);

/**
 * delete a model
 */
export const deleteModel = createAsyncThunk(
  'models/deleteModel',
  async (modelId: string, { rejectWithValue }) => {
    try {
      await window.electron.deleteModel({ modelId });
      return modelId;
    } catch (error) {
      return rejectWithValue('Failed to delete model.');
    }
  },
);
