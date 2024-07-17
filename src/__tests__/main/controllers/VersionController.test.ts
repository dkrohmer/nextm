import { ipcMain, ipcRenderer } from 'electron';
import { VersionService } from '../../../main/services/VersionService';
import { VersionController } from '../../../main/controllers/VersionController';
import { Version } from '../../../main/models/Version';

jest.mock('../../../main/services/VersionService');

describe('VersionController', () => {
  let versionController: VersionController;
  let versionService: jest.Mocked<VersionService>;

  beforeEach(() => {
    versionController = new VersionController();
    versionService = new VersionService() as jest.Mocked<VersionService>;
    versionController['versionService'] = versionService;
  });

  afterEach(() => {
    jest.clearAllMocks();
    versionController.destroy();
    ipcMain.removeHandler('create-version');
    ipcMain.removeHandler('get-all-versions');
    ipcMain.removeHandler('get-version-by-id');
    ipcMain.removeHandler('get-latest-version');
    ipcMain.removeHandler('delete-version');
  });

  it('should handle create-version correctly', async () => {
    const mockVersion = new Version();
    mockVersion.id = '123';
    mockVersion.createdAt = new Date();
    mockVersion.modelId = 'test-model';
    mockVersion.payload = '{"graph":{}}';
    mockVersion.thumbnail = 'thumb';
    mockVersion.x = 0;
    mockVersion.y = 0;
    mockVersion.width = 100;
    mockVersion.height = 100;
    mockVersion.toJSON = jest.fn().mockReturnValue({
      ...mockVersion,
      createdAt: mockVersion.createdAt.toISOString(),
    });

    versionService.createVersion.mockResolvedValue(mockVersion);

    const response = await ipcRenderer.invoke('create-version', {
      modelId: 'test-model',
      payload: { graph: { "graph": {} } },
      thumbnail: 'thumb',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });

    expect(response).toEqual({ ...mockVersion, payload: '{"graph":{}}' });
    expect(versionService.createVersion).toHaveBeenCalledWith({
      modelId: 'test-model',
      thumbnail: 'thumb',
      payload: '{"graph":{}}',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
  });

  it('should handle create-version error', async () => {
    const error = new Error('Model not found');
    versionService.createVersion.mockRejectedValue(new Error('Model not found'));

    // const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const response = await ipcRenderer.invoke('create-version', {
      modelId: null,
      payload: { graph: { "graph": {} } },
      thumbnail: 'thumb',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });

    expect(response).toEqual(error);
  });

  it('should handle get-all-versions correctly', async () => {
    const mockVersion = new Version();
    mockVersion.id = '123';
    mockVersion.createdAt = new Date();
    mockVersion.payload = '{"graph": {}}';
    mockVersion.toJSON = jest.fn().mockReturnValue({
      ...mockVersion,
      createdAt: mockVersion.createdAt.toISOString(),
    });

    versionService.getAllVersions.mockResolvedValue({
      versions: [mockVersion],
      versionsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-versions', {
      sort: 'asc',
      sortby: 'createdAt',
      modelId: 'test-model',
    });

    expect(response).toEqual({ versions: [mockVersion], versionsCount: 1 });
    expect(versionService.getAllVersions).toHaveBeenCalledWith(
      'createdAt',
      'asc',
      'test-model'
    );
  });

  it('should handle get-all-versions with invalid sort direction', async () => {
    const mockVersion = new Version();
    mockVersion.id = '123';
    mockVersion.createdAt = new Date();
    mockVersion.payload = '{"graph": {}}';
    mockVersion.toJSON = jest.fn().mockReturnValue({
      ...mockVersion,
      createdAt: mockVersion.createdAt.toISOString(),
    });

    versionService.getAllVersions.mockResolvedValue({
      versions: [mockVersion],
      versionsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-versions', {
      sort: 'invalid',
      sortby: 'test',
      modelId: 'test-model',
    });

    expect(response).toEqual({ versions: [mockVersion], versionsCount: 1 });
    expect(versionService.getAllVersions).toHaveBeenCalledWith(
      'createdAt',
      'desc',
      'test-model'
    );
  });

  it('should handle get-all-versions with missing sortby', async () => {
    const mockVersion = new Version();
    mockVersion.id = '123';
    mockVersion.createdAt = new Date();
    mockVersion.payload = '{"graph": {}}';
    mockVersion.toJSON = jest.fn().mockReturnValue({
      ...mockVersion,
      createdAt: mockVersion.createdAt.toISOString(),
    });
  
    versionService.getAllVersions.mockResolvedValue({
      versions: [mockVersion],
      versionsCount: 1,
    });
  
    const response = await ipcRenderer.invoke('get-all-versions', {
      sort: 'asc',
      modelId: 'test-model',
    });
  
    expect(response).toEqual({ versions: [mockVersion], versionsCount: 1 });
    expect(versionService.getAllVersions).toHaveBeenCalledWith(
      'createdAt',
      'asc',
      'test-model'
    );
  });

  it('should handle get-all-versions error', async () => {
    const error = new Error('Fetch error');
    versionService.getAllVersions.mockRejectedValue(error);

    // const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const response = await ipcRenderer.invoke('get-all-versions', {
      sort: 'asc',
      sortby: 'createdAt',
      modelId: 'test-model',
    });

    expect(response).toEqual(error);
  });

  it('should handle get-version-by-id correctly', async () => {
    const mockVersion = new Version();
    mockVersion.id = '123';
    mockVersion.createdAt = new Date();
    mockVersion.payload = '{"graph": {}}';
    mockVersion.toJSON = jest.fn().mockReturnValue({
      ...mockVersion,
      createdAt: mockVersion.createdAt.toISOString(),
    });

    versionService.getVersionById.mockResolvedValue(mockVersion);

    const response = await ipcRenderer.invoke('get-version-by-id', {
      versionId: '123',
    });

    expect(response).toEqual({ ...mockVersion, payload: { graph: {} } });
    expect(versionService.getVersionById).toHaveBeenCalledWith('123');
  });

  it('should handle get-version-by-id error', async () => {
    const error = new Error('Fetch error');
    versionService.getVersionById.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('get-version-by-id', {
      versionId: '123',
    });

    expect(response).toEqual(error);
  });

  it('should handle get-version-by-id nulled', async () => {
    const error = new Error('Failed to get version');
    versionService.getVersionById.mockResolvedValue(null);

    const response = await ipcRenderer.invoke('get-version-by-id', {
      versionId: '123',
    });

    expect(response).toEqual(error);
  });

  it('should get the latest version by model ID', async () => {
    const mockModelId = 'testModelId';
    const mockVersion = new Version();
    mockVersion.id = '1';
    mockVersion.modelId = mockModelId;
    mockVersion.payload = '{"graph": {}}';

    versionService.getLatestVersionByModelId.mockResolvedValue(mockVersion);

    const result = await ipcRenderer.invoke('get-latest-version', {
      modelId: 'testModelId',
    });

    expect(versionService.getLatestVersionByModelId).toHaveBeenCalledWith(mockModelId);
    expect(result).toEqual({
      ...mockVersion,
      payload: JSON.parse(mockVersion.payload),
    });
  });

  it('should handle get-latest-version by model ID error', async () => {
    const error = new Error('Fetch error');
    versionService.getLatestVersionByModelId.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('get-latest-version', {
      modelId: 'testModelId',
    });

    expect(response).toEqual(error);
  });

  it('should handle get-latest-version by model ID with nulled versionService result', async () => {
    const error = new Error('Failed to get latest version');
    versionService.getLatestVersionByModelId.mockResolvedValue(null);

    const response = await ipcRenderer.invoke('get-latest-version', {
      modelId: 'testModelId',
    });

    expect(response).toEqual(error);
  });

  it('should handle get-latest-version by model ID with nulled modelId', async () => {
    const error = new Error('No modelId provided');
    // versionService.getLatestVersionByModelId.mockResolvedValue(null);

    const response = await ipcRenderer.invoke('get-latest-version', {
      modelId: null,
    });

    expect(response).toEqual(error);
  });

  it('should handle delete-version correctly', async () => {
    const response = await ipcRenderer.invoke('delete-version', {
      modelId: 'test-model',
    });

    expect(response).toBeUndefined();
    expect(versionService.deleteVersion).toHaveBeenCalledWith('test-model');
  });

  it('should handle delete-version error', async () => {
    const error = new Error('Delete error');
    versionService.deleteVersion.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('delete-version', {
      modelId: 'test-model',
    });

    expect(response).toEqual(error);
  });
});
