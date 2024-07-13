import { ipcMain, ipcRenderer } from '../../../__mocks__/electron-mock';
import { ModelService } from '../../../main/services/ModelService';
import { ModelController } from '../../../main/controllers/ModelController';
import { Model } from '../../../main/models/Model';

jest.mock('../../../main/services/ModelService');

describe('ModelController', () => {
  let modelController: ModelController;
  let modelService: jest.Mocked<ModelService>;

  beforeEach(() => {
    modelController = new ModelController();
    modelService = new ModelService() as jest.Mocked<ModelService>;
    modelController['modelService'] = modelService;
  });

  afterEach(() => {
    jest.clearAllMocks();
    modelController.destroy();
    ipcMain.removeHandler('create-model');
    ipcMain.removeHandler('get-all-models');
    ipcMain.removeHandler('get-model-by-id');
    ipcMain.removeHandler('update-model');
    ipcMain.removeHandler('delete-model');
  });

  it('should handle create-model correctly', async () => {
    const mockModel = new Model();
    mockModel.id = '123';
    mockModel.createdAt = new Date();
    mockModel.name = 'test-model';
    mockModel.toJSON = jest.fn().mockReturnValue({
      ...mockModel,
      createdAt: mockModel.createdAt.toISOString(),
    });

    modelService.createModel.mockResolvedValue(mockModel);

    const response = await ipcRenderer.invoke('create-model', {
      incrementId: 'test-increment',
      name: 'test-model',
    });

    expect(response).toEqual(mockModel);
    expect(modelService.createModel).toHaveBeenCalledWith({
      incrementId: 'test-increment',
      name: 'test-model',
    });
  });

  it('should handle create-model error', async () => {
    const error = new Error('Increment not found');
    modelService.createModel.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('create-model', {
      incrementId: null,
      name: 'test-model',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle get-all-models correctly', async () => {
    const mockModel = new Model();
    mockModel.id = '123';
    mockModel.createdAt = new Date();
    mockModel.name = 'test-model';
    mockModel.toJSON = jest.fn().mockReturnValue({
      ...mockModel,
      createdAt: mockModel.createdAt.toISOString(),
    });

    modelService.getAllModels.mockResolvedValue({
      models: [mockModel],
      modelsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-models', {
      sort: 'asc',
      sortby: 'createdAt',
      incrementId: 'test-increment',
    });

    expect(response).toEqual({ models: [mockModel], modelsCount: 1 });
    expect(modelService.getAllModels).toHaveBeenCalledWith(
      'createdAt',
      'asc',
      'test-increment'
    );
  });

  it('should handle get-all-models with invalid sort direction', async () => {
    const mockModel = new Model();
    mockModel.id = '123';
    mockModel.createdAt = new Date();
    mockModel.name = 'test-model';
    mockModel.toJSON = jest.fn().mockReturnValue({
      ...mockModel,
      createdAt: mockModel.createdAt.toISOString(),
    });

    modelService.getAllModels.mockResolvedValue({
      models: [mockModel],
      modelsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-models', {
      sort: 'invalid',
      sortby: 'createdAt',
      incrementId: 'test-increment',
    });

    expect(response).toEqual({ models: [mockModel], modelsCount: 1 });
    expect(modelService.getAllModels).toHaveBeenCalledWith(
      'createdAt',
      'desc',
      'test-increment'
    );
  });

  it('should handle get-all-models with invalid sortby', async () => {
    const mockModel = new Model();
    mockModel.id = '123';
    mockModel.createdAt = new Date();
    mockModel.name = 'test-model';
    mockModel.toJSON = jest.fn().mockReturnValue({
      ...mockModel,
      createdAt: mockModel.createdAt.toISOString(),
    });

    modelService.getAllModels.mockResolvedValue({
      models: [mockModel],
      modelsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-models', {
      sort: 'asc',
      sortby: 'invalid-field',
      incrementId: 'test-increment',
    });

    expect(response).toEqual({ models: [mockModel], modelsCount: 1 });
    expect(modelService.getAllModels).toHaveBeenCalledWith(
      'createdAt',
      'asc',
      'test-increment'
    );
  });

  it('should handle get-all-models with missing sortby', async () => {
    const mockModel = new Model();
    mockModel.id = '123';
    mockModel.createdAt = new Date();
    mockModel.name = 'test-model';
    mockModel.toJSON = jest.fn().mockReturnValue({
      ...mockModel,
      createdAt: mockModel.createdAt.toISOString(),
    });

    modelService.getAllModels.mockResolvedValue({
      models: [mockModel],
      modelsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-models', {
      sort: 'asc',
      incrementId: 'test-increment',
    });

    expect(response).toEqual({ models: [mockModel], modelsCount: 1 });
    expect(modelService.getAllModels).toHaveBeenCalledWith(
      'createdAt',
      'asc',
      'test-increment'
    );
  });

  it('should handle get-all-models error', async () => {
    const error = new Error('Fetch error');
    modelService.getAllModels.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('get-all-models', {
      sort: 'asc',
      sortby: 'createdAt',
      incrementId: 'test-increment',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle get-model-by-id correctly', async () => {
    const mockModel = new Model();
    mockModel.id = '123';
    mockModel.createdAt = new Date();
    mockModel.name = 'test-model';
    mockModel.toJSON = jest.fn().mockReturnValue({
      ...mockModel,
      createdAt: mockModel.createdAt.toISOString(),
    });

    modelService.getModelById.mockResolvedValue(mockModel);

    const response = await ipcRenderer.invoke('get-model-by-id', {
      modelId: '123',
      isEagerLoading: true,
    });

    expect(response).toEqual(mockModel);
    expect(modelService.getModelById).toHaveBeenCalledWith('123', true);
  });

  it('should handle get-model-by-id error', async () => {
    const error = new Error('Fetch error');
    modelService.getModelById.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('get-model-by-id', {
      modelId: '123',
      isEagerLoading: true,
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle get-model-by-id nulled', async () => {
    const error = new Error('Failed to get model');
    modelService.getModelById.mockResolvedValue(null);

    const response = await ipcRenderer.invoke('get-model-by-id', {
      modelId: '123',
      isEagerLoading: true,
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle update-model correctly', async () => {
    const mockModel = new Model();
    mockModel.id = '123';
    mockModel.createdAt = new Date();
    mockModel.name = 'updated-model';
    mockModel.toJSON = jest.fn().mockReturnValue({
      ...mockModel,
      createdAt: mockModel.createdAt.toISOString(),
    });

    modelService.updateModel.mockResolvedValue(mockModel);

    const response = await ipcRenderer.invoke('update-model', {
      id: '123',
      name: 'updated-model',
    });

    expect(response).toEqual(mockModel);
    expect(modelService.updateModel).toHaveBeenCalledWith('123', {
      name: 'updated-model',
    });
  });

  it('should handle update-model error', async () => {
    const error = new Error('Update error');
    modelService.updateModel.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('update-model', {
      id: '123',
      name: 'updated-model',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle update-model nulled', async () => {
    const error = new Error('Failed to update model');
    modelService.updateModel.mockResolvedValue(null);

    const response = await ipcRenderer.invoke('update-model', {
      id: '123',
      name: 'updated-model',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle delete-model correctly', async () => {
    const response = await ipcRenderer.invoke('delete-model', {
      modelId: '123',
    });

    expect(response).toBeUndefined();
    expect(modelService.deleteModel).toHaveBeenCalledWith('123');
  });

  it('should handle delete-model error', async () => {
    const error = new Error('Delete error');
    modelService.deleteModel.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('delete-model', {
      modelId: '123',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });
});
