import { configureStore } from '@reduxjs/toolkit';
import modelsReducer from '../../../../renderer/store/models'; // Import the models reducer
import {
  fetchModels,
  fetchModel,
  addOrUpdateModel,
  deleteModel,
} from '../../../../renderer/services/api/models';
import windowElectron from '../../../../../mocks/window-electron';

// Set up a test store with the modelsReducer slice
const store = configureStore({
  reducer: {
    models: modelsReducer,
  },
});

// Tests for models thunks
describe('Models Thunks with Redux Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fetchModels and updates the store on success', async () => {
    const mockModels = [{ id: '1', name: 'Model 1', incrementId: '123', createdAt: '1' }];

    window.electron = {
      ...windowElectron,
      getAllModels: jest.fn().mockResolvedValue(mockModels),
    };

    // Dispatch the fetchModels thunk
    await store.dispatch(fetchModels({ incrementId: 'increment-123' }));

    const state = store.getState().models;
    expect(window.electron.getAllModels).toHaveBeenCalledWith({
      incrementId: 'increment-123',
    });
    expect(state.models).toEqual(mockModels);
  });

  it('dispatches fetchModel and updates the store on success', async () => {
    const mockModel = { id: '1', name: 'Model 1', incrementId: '123', createdAt: '1' };

    window.electron = {
      ...windowElectron,
      getModelById: jest.fn().mockResolvedValue(mockModel),
    };

    // Dispatch the fetchModel thunk
    await store.dispatch(fetchModel({ modelId: '1', isEagerLoading: true }));

    expect(window.electron.getModelById).toHaveBeenCalledWith({
      modelId: '1',
      isEagerLoading: true,
    });

    const state = store.getState().models;
    expect(state.model).toEqual(mockModel);
  });

  it('dispatches addOrUpdateModel and updates the store for an update', async () => {
    const mockModel = { id: '1', name: 'Updated Model', incrementId: '123', createdAt: '1' };

    window.electron = {
      ...windowElectron,
      updateModel: jest.fn().mockResolvedValue(mockModel),
    };

    // Dispatch the addOrUpdateModel thunk
    await store.dispatch(addOrUpdateModel({ model: mockModel, incrementId: '123' }));

    const state = store.getState().models;
    expect(state.models[0]).toEqual(mockModel);
    expect(window.electron.updateModel).toHaveBeenCalledWith({
      ...mockModel,
      incrementId: '123',
    });
  });

  it('dispatches addOrUpdateModel and updates the store for a new model', async () => {
    const newModel = { id: '', name: 'New Model', incrementId: '123', createdAt: '1' };
    const mockCreatedModel = { id: '1', name: 'New Model', incrementId: '123', createdAt: '1' };

    window.electron = {
      ...windowElectron,
      createModel: jest.fn().mockResolvedValue(mockCreatedModel),
    };

    // Dispatch the addOrUpdateModel thunk
    await store.dispatch(addOrUpdateModel({ model: newModel, incrementId: '123' }));

    const state = store.getState().models;
    expect(state.models[0]).toEqual(mockCreatedModel);
    expect(window.electron.createModel).toHaveBeenCalledWith({
      ...newModel,
      incrementId: '123',
    });
  });

  it('dispatches deleteModel and updates the store on success', async () => {
    window.electron = {
      ...windowElectron,
      deleteModel: jest.fn().mockResolvedValue('1'),
    };

    // Dispatch the deleteModel thunk
    await store.dispatch(deleteModel('1'));

    const state = store.getState().models;
    expect(state.models.find((model) => model.id === '1')).toBeUndefined();
    expect(window.electron.deleteModel).toHaveBeenCalledWith({ modelId: '1' });
  });

  it('handles fetchModels failure correctly', async () => {
    window.electron = {
      ...windowElectron,
      getAllModels: jest.fn().mockRejectedValue(new Error('Failed to load models.')),
    };

    // Dispatch the fetchModels thunk
    await store.dispatch(fetchModels({ incrementId: 'increment-123' }));

    const state = store.getState().models;
    expect(state.modelsError).toBe('Failed to load models.');
    expect(window.electron.getAllModels).toHaveBeenCalledWith({
      incrementId: 'increment-123',
    });
  });

  it('handles fetchModel failure correctly', async () => {
    window.electron.getModelById = jest.fn().mockRejectedValue(new Error('Failed to load model.'));

    // Dispatch the fetchModel thunk
    await store.dispatch(fetchModel({ modelId: '1', isEagerLoading: true }));

    const state = store.getState().models;
    expect(state.modelError).toBe('Failed to load model.');
    expect(window.electron.getModelById).toHaveBeenCalledWith({
      modelId: '1',
      isEagerLoading: true,
    });
  });

  it('handles addOrUpdateModel failure correctly', async () => {
    const mockModel = { id: '1', name: 'Model 1', incrementId: '1', createdAt: '1' };
    window.electron.updateModel = jest.fn().mockRejectedValue(new Error('Failed to add or update model.'));

    // Dispatch the addOrUpdateModel thunk
    await store.dispatch(addOrUpdateModel({ model: mockModel, incrementId: 'increment-123' }));

    const state = store.getState().models;
    expect(state.modelsError).toBe('Failed to add or update model.');
  });

  it('handles deleteModel failure correctly', async () => {
    window.electron.deleteModel = jest.fn().mockRejectedValue(new Error('Failed to delete model.'));

    // Dispatch the deleteModel thunk
    await store.dispatch(deleteModel('1'));

    const state = store.getState().models;
    expect(state.modelsError).toBe('Failed to delete model.');
  });
});
