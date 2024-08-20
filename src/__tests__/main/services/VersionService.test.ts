import 'reflect-metadata';
import { VersionService } from '../../../main/services/VersionService';
import { VersionRepository } from '../../../main/repositories/VersionRepository';
import { ModelRepository } from '../../../main/repositories/ModelRepository';
import { buildVersionEntity } from '../../../main/helpers/entityBuilder';
import { Version } from '../../../main/models/Version';
import { Model } from '../../../main/models/Model';

jest.mock('../../../main/repositories/VersionRepository');
jest.mock('../../../main/repositories/ModelRepository');
jest.mock('../../../main/helpers/entityBuilder');

describe('VersionService', () => {
  let versionService: VersionService;
  let versionRepository: jest.Mocked<VersionRepository>;
  let modelRepository: jest.Mocked<ModelRepository>;

  beforeEach(() => {
    versionRepository = new VersionRepository() as jest.Mocked<VersionRepository>;
    modelRepository = new ModelRepository() as jest.Mocked<ModelRepository>;
    versionService = new VersionService();

    (versionService as any).versionRepository = versionRepository;
    (versionService as any).modelRepository = modelRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createVersion', () => {
    it('should create a version successfully', async () => {
      const modelId = 'model-uuid';
      const versionData: Partial<Version> = {
        modelId,
        payload: '{"key": "value"}',
        thumbnail: 'thumbnail.png',
      };

      const model = new Model();
      model.id = modelId;

      const newVersion = new Version();
      Object.assign(newVersion, versionData, { id: 'version-uuid', toJSON: jest.fn().mockReturnValue({}) });

      modelRepository.getModelById.mockResolvedValue(model);
      versionRepository.getLatestVersionByModelId.mockResolvedValue(null);
      versionRepository.countVersionsByModelId.mockResolvedValue(0);
      (buildVersionEntity as jest.Mock).mockReturnValue(newVersion);
      versionRepository.createVersion.mockResolvedValue(newVersion);

      const result = await versionService.createVersion(versionData);

      expect(modelRepository.getModelById).toHaveBeenCalledWith(modelId, false);
      expect(buildVersionEntity).toHaveBeenCalledWith(expect.objectContaining(versionData), 0);
      expect(versionRepository.createVersion).toHaveBeenCalledWith(newVersion);
      expect(result).toEqual({});
    });

    it('should create a version and delete the earliest version if version count exceeds 1000', async () => {
      const modelId = 'model-uuid';
      const versionData: Partial<Version> = {
        modelId,
        payload: '{"key": "value"}',
        thumbnail: 'thumbnail.png',
      };

      const model = new Model();
      model.id = modelId;

      const latestVersion = new Version();
      latestVersion.versionIndex = 999;

      const newVersion = new Version();
      Object.assign(newVersion, versionData, { id: 'version-uuid', toJSON: jest.fn().mockReturnValue({}) });

      modelRepository.getModelById.mockResolvedValue(model);
      versionRepository.getLatestVersionByModelId.mockResolvedValue(latestVersion);
      versionRepository.countVersionsByModelId.mockResolvedValue(1000);
      (buildVersionEntity as jest.Mock).mockReturnValue(newVersion);
      versionRepository.createVersion.mockResolvedValue(newVersion);

      const result = await versionService.createVersion(versionData);

      expect(modelRepository.getModelById).toHaveBeenCalledWith(modelId, false);
      expect(buildVersionEntity).toHaveBeenCalledWith(expect.objectContaining(versionData), 1000);
      expect(versionRepository.deleteEarliestVersionByModelId).toHaveBeenCalledWith(modelId);
      expect(versionRepository.createVersion).toHaveBeenCalledWith(newVersion);
      expect(result).toEqual({});
    });

    it('should throw an error if model not found', async () => {
      const versionData: Partial<Version> = {
        modelId: 'model-uuid',
        payload: '{"key": "value"}',
        thumbnail: 'thumbnail.png',
      };

      modelRepository.getModelById.mockResolvedValue(null);

      await expect(versionService.createVersion(versionData)).rejects.toThrow('Model not found');
    });
  });

  describe('getAllVersions', () => {
    it('should return all versions with count', async () => {
      const versions = [
        new Version(),
        new Version(),
      ];
      versions[0].toJSON = jest.fn().mockReturnValue({});
      versions[1].toJSON = jest.fn().mockReturnValue({});
      const versionsCount = 2;

      versionRepository.getAllVersions.mockResolvedValue([versions, versionsCount]);

      const result = await versionService.getAllVersions('versionIndex', 'asc', 'model-uuid');

      expect(versionRepository.getAllVersions).toHaveBeenCalledWith('versionIndex', 'asc', 'model-uuid');
      expect(result).toEqual({ versions: [{}, {}], versionsCount });
    });
  });

  describe('getVersionById', () => {
    it('should return the version by id', async () => {
      const version = new Version();
      version.toJSON = jest.fn().mockReturnValue({});

      versionRepository.getVersionById.mockResolvedValue(version);

      const result = await versionService.getVersionById('version-uuid');

      expect(versionRepository.getVersionById).toHaveBeenCalledWith('version-uuid');
      expect(result).toEqual({});
    });

    it('should throw an error if version not found', async () => {
      versionRepository.getVersionById.mockResolvedValue(null);

      await expect(versionService.getVersionById('version-uuid')).rejects.toThrow('Cannot read properties of null (reading \'toJSON\')');
    });
  });

  describe('getLatestVersionByModelId', () => {
    it('should return the latest version for a model', async () => {
      const version = new Version();
      version.toJSON = jest.fn().mockReturnValue({});

      versionRepository.getLatestVersionByModelId.mockResolvedValue(version);

      const result = await versionService.getLatestVersionByModelId('model-uuid');

      expect(versionRepository.getLatestVersionByModelId).toHaveBeenCalledWith('model-uuid');
      expect(result).toEqual({});
    });
  });

  describe('deleteVersion', () => {
    it('should delete a version', async () => {
      await versionService.deleteVersion('version-uuid');

      expect(versionRepository.deleteVersion).toHaveBeenCalledWith('version-uuid');
    });
  });

  describe('getLatestVersionThumbnailByModelId', () => {
    it('should return the latest version thumbnail for a model', async () => {
      const modelId = 'model-uuid';
      const mockThumbnail = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...';
      versionRepository.getLatestVersionThumbnailByModelId.mockResolvedValue(mockThumbnail);
      const result = await versionService.getLatestVersionThumbnailByModelId(modelId);
      expect(versionRepository.getLatestVersionThumbnailByModelId).toHaveBeenCalledWith(modelId);
      expect(result).toEqual(mockThumbnail);
    });
  
    it('should return null if no thumbnail is found for the model', async () => {
      const modelId = 'model-uuid';
      versionRepository.getLatestVersionThumbnailByModelId.mockResolvedValue(null);
      const result = await versionService.getLatestVersionThumbnailByModelId(modelId);
      expect(versionRepository.getLatestVersionThumbnailByModelId).toHaveBeenCalledWith(modelId);
      expect(result).toBeNull();
    });
  });
});
