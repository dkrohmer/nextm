import { ModelService } from '../../../main/services/ModelService';
import { ModelRepository } from '../../../main/repositories/ModelRepository';
import { IncrementRepository } from '../../../main/repositories/IncrementRepository';
import { buildModelEntity } from '../../../main/helpers/entityBuilder';
import { Model } from '../../../main/models/Model';
import { Increment } from '../../../main/models/Increment';
import 'reflect-metadata';

jest.mock('../../../main/repositories/ModelRepository');
jest.mock('../../../main/repositories/IncrementRepository');
jest.mock('../../../main/helpers/entityBuilder');

describe('ModelService', () => {
  let modelService: ModelService;
  let modelRepository: jest.Mocked<ModelRepository>;
  let incrementRepository: jest.Mocked<IncrementRepository>;

  beforeEach(() => {
    modelRepository = new ModelRepository() as jest.Mocked<ModelRepository>;
    incrementRepository =
      new IncrementRepository() as jest.Mocked<IncrementRepository>;
    modelService = new ModelService();

    (modelService as any).modelRepository = modelRepository;
    (modelService as any).incrementRepository = incrementRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createModel', () => {
    it('should create a model successfully', async () => {
      const incrementId = 'increment-uuid';
      const modelData: Partial<Model> = {
        incrementId,
        name: 'Model 1',
      };

      const increment = new Increment();
      increment.id = incrementId;

      const newModel = new Model();
      Object.assign(newModel, modelData, {
        id: 'model-uuid',
        toJSON: jest.fn().mockReturnValue({}),
      });

      incrementRepository.getIncrementById.mockResolvedValue(increment);
      (buildModelEntity as jest.Mock).mockReturnValue(newModel);
      modelRepository.createModel.mockResolvedValue(newModel);

      const result = await modelService.createModel(modelData);

      expect(incrementRepository.getIncrementById).toHaveBeenCalledWith(
        incrementId,
        false,
      );
      expect(buildModelEntity).toHaveBeenCalledWith(
        expect.objectContaining(modelData),
      );
      expect(modelRepository.createModel).toHaveBeenCalledWith(newModel);
      expect(result).toEqual({});
    });

    it('should throw an error if increment not found', async () => {
      const modelData: Partial<Model> = {
        incrementId: 'increment-uuid',
        name: 'Model 1',
      };

      incrementRepository.getIncrementById.mockResolvedValue(null);

      await expect(modelService.createModel(modelData)).rejects.toThrow(
        'Product not found',
      );
    });
  });

  describe('getAllModels', () => {
    it('should return all models with count', async () => {
      const models = [new Model(), new Model()];
      models[0].toJSON = jest.fn().mockReturnValue({});
      models[1].toJSON = jest.fn().mockReturnValue({});
      const modelsCount = 2;

      modelRepository.getAllModels.mockResolvedValue([models, modelsCount]);

      const result = await modelService.getAllModels(
        'name',
        'asc',
        'increment-uuid',
      );

      expect(modelRepository.getAllModels).toHaveBeenCalledWith(
        'name',
        'asc',
        'increment-uuid',
      );
      expect(result).toEqual({ models: [{}, {}], modelsCount });
    });
  });

  describe('getModelById', () => {
    it('should return the model by id', async () => {
      const model = new Model();
      model.toJSON = jest.fn().mockReturnValue({});

      modelRepository.getModelById.mockResolvedValue(model);

      const result = await modelService.getModelById('model-uuid', true);

      expect(modelRepository.getModelById).toHaveBeenCalledWith(
        'model-uuid',
        true,
      );
      expect(result).toEqual({});
    });

    it('should throw an error if model not found', async () => {
      modelRepository.getModelById.mockResolvedValue(null);

      await expect(
        modelService.getModelById('model-uuid', true),
      ).rejects.toThrow("Cannot read properties of null (reading 'toJSON')");
    });
  });

  describe('updateModel', () => {
    it('should update a model', async () => {
      const model = new Model();
      model.toJSON = jest.fn().mockReturnValue({});
      const updateData: Partial<Model> = { name: 'Updated Model' };

      modelRepository.updateModel.mockResolvedValue(model);

      const result = await modelService.updateModel('model-uuid', updateData);

      expect(modelRepository.updateModel).toHaveBeenCalledWith(
        'model-uuid',
        updateData,
      );
      expect(result).toEqual({});
    });
  });

  describe('deleteModel', () => {
    it('should delete a model', async () => {
      await modelService.deleteModel('model-uuid');

      expect(modelRepository.deleteModel).toHaveBeenCalledWith('model-uuid');
    });
  });
});
