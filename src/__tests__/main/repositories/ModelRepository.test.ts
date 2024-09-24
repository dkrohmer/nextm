import { DataSource } from 'typeorm';
import { Model } from '../../../main/models/Model';
import { Increment } from '../../../main/models/Increment';
import { initializeDataSource, getDataSource } from '../../../main/database';
import { ModelRepository } from '../../../main/repositories/ModelRepository';
import { Product } from '../../../main/models/Product';

let dataSource: DataSource;
let modelRepository: ModelRepository;
let incrementId: string;

beforeAll(async () => {
  await initializeDataSource(':memory:');
  dataSource = getDataSource();
  modelRepository = new ModelRepository();

  // Create a product to be used for the increment entries
  const product = new Product();
  product.name = 'Test Product';
  const savedProduct = await dataSource.getRepository(Product).save(product);

  // Create an increment to be used for the model entries
  const increment = new Increment();
  increment.name = 'Test Increment';
  increment.incrementIndex = 1;
  increment.product = savedProduct; // Associate the increment with the product
  const savedIncrement = await dataSource.getRepository(Increment).save(increment);
  incrementId = savedIncrement.id;
});

afterAll(async () => {
  await dataSource.destroy();
});

describe('ModelRepository', () => {
  it('should create a new model', async () => {
    const model = new Model();
    model.name = 'Test Model';
    model.incrementId = incrementId;

    const savedModel = await modelRepository.createModel(model);

    expect(savedModel).toHaveProperty('id');
    expect(savedModel.name).toBe('Test Model');
    expect(savedModel.incrementId).toBe(incrementId);
  });

  it('should get all models sorted by name', async () => {
    const [models, count] = await modelRepository.getAllModels('name', 'asc');

    expect(Array.isArray(models)).toBe(true);
    expect(typeof count).toBe('number');
  });

  it('should get all models for an incrementId', async () => {
    const [models, count] = await modelRepository.getAllModels('name', 'asc', incrementId);

    expect(Array.isArray(models)).toBe(true);
    expect(count).toBeGreaterThan(0);
    models.forEach((model) => expect(model.incrementId).toBe(incrementId));
  });

  it('should get a model by id', async () => {
    const model = new Model();
    model.name = 'Find By ID Model';
    model.incrementId = incrementId;
    const savedModel = await modelRepository.createModel(model);

    const foundModel = await modelRepository.getModelById(savedModel.id, false);
    expect(foundModel).toBeDefined();
    expect(foundModel!.id).toBe(savedModel.id);
  });

  it('should return null when getting a non-existent model by id', async () => {
    const foundModel = await modelRepository.getModelById('non-existent-id', false);
    expect(foundModel).toBeNull();
  });

  it('should return null when getting a model without submitting an id', async () => {
    const foundModel = await modelRepository.getModelById('', false);
    expect(foundModel).toBeNull();
  });

  it('should get a model by id with eager flag', async () => {
    const model = new Model();
    model.name = 'Eager Model';
    model.incrementId = incrementId;
    const savedModel = await modelRepository.createModel(model);

    const foundModel = await modelRepository.getModelById(savedModel.id, true);
    expect(foundModel).toBeDefined();
    expect(foundModel!.id).toBe(savedModel.id);
    expect(foundModel!.versions).toBeDefined(); // Ensure eager relations are loaded
  });

  it('should update a model', async () => {
    const model = new Model();
    model.name = 'Update Model';
    model.incrementId = incrementId;
    const savedModel = await modelRepository.createModel(model);

    savedModel.name = 'Updated Model';
    const updatedModel = await modelRepository.updateModel(savedModel.id, savedModel);

    expect(updatedModel).toBeDefined();
    expect(updatedModel!.name).toBe('Updated Model');
  });

  it('should return null when updating a non-existent model', async () => {
    const updatedModel = await modelRepository.updateModel('non-existent-id', { name: 'Updated Model' });
    expect(updatedModel).toBeNull();
  });

  it('should delete a model', async () => {
    const model = new Model();
    model.name = 'Delete Model';
    model.incrementId = incrementId;
    const savedModel = await modelRepository.createModel(model);

    await modelRepository.deleteModel(savedModel.id);
    const deletedModel = await modelRepository.getModelById(savedModel.id, false);

    expect(deletedModel).toBeNull();
  });

  it('should not throw an error when deleting a non-existent model', async () => {
    await expect(modelRepository.deleteModel('non-existent-id')).resolves.not.toThrow();
  });

  it('should throw an error when creating a model with invalid data', async () => {
    const invalidModel = new Model();
    invalidModel.name = ''; // Invalid: name is empty
    invalidModel.incrementId = 'invalid-uuid'; // Invalid: incrementId is not a valid UUID

    await expect(modelRepository.createModel(invalidModel))
      .rejects
      .toThrow('Validation failed');
  });

  // Test failed validation during update
  it('should throw an error when updating a model with invalid data', async () => {
    const model = new Model();
    model.name = 'Valid Name';
    model.incrementId = incrementId; // Valid incrementId
    const savedModel = await modelRepository.createModel(model);

    // Try updating with invalid data
    const updatedModel = {
      ...savedModel,
      name: '', // Invalid: name is empty
      incrementId: 'invalid-uuid', // Invalid: not a valid UUID
    };

    await expect(modelRepository.updateModel(savedModel.id, updatedModel))
      .rejects
      .toThrow('Validation failed');
  });
});