import { DataSource } from 'typeorm';
import { Increment } from '../../../main/models/Increment';
import { Product } from '../../../main/models/Product';
import { initializeDataSource, getDataSource } from '../../../main/database';
import { IncrementRepository } from '../../../main/repositories/IncrementRepository';

let dataSource: DataSource;
let incrementRepository: IncrementRepository;
let productId: string;

beforeAll(async () => {
  await initializeDataSource(':memory:');
  dataSource = getDataSource();
  incrementRepository = new IncrementRepository();

  const product = new Product();
  product.name = 'Test Product';
  const savedProduct = await dataSource.getRepository(Product).save(product);
  productId = savedProduct.id;
});

afterAll(async () => {
  await dataSource.destroy();
});

describe('IncrementRepository', () => {
  it('should create a new increment', async () => {
    const increment = new Increment();
    increment.name = 'Test Increment';
    increment.productId = productId;
    increment.incrementIndex = 1;

    const savedIncrement = await incrementRepository.createIncrement(increment);

    expect(savedIncrement).toHaveProperty('id');
    expect(savedIncrement.name).toBe('Test Increment');
    expect(savedIncrement.productId).toBe(productId);
  });

  it('should get all increments sorted by name', async () => {
    const [increments, count] = await incrementRepository.getAllIncrements(
      'name',
      'asc',
    );

    expect(Array.isArray(increments)).toBe(true);
    expect(typeof count).toBe('number');
  });

  it('should get all increments for a productId', async () => {
    const [increments, count] = await incrementRepository.getAllIncrements(
      'name',
      'asc',
      productId,
    );

    expect(Array.isArray(increments)).toBe(true);
    expect(count).toBeGreaterThan(0);
    increments.forEach((increment) =>
      expect(increment.productId).toBe(productId),
    );
  });

  it('should get an increment by id', async () => {
    const increment = new Increment();
    increment.name = 'Find By ID Increment';
    increment.productId = productId;
    increment.incrementIndex = 2;
    const savedIncrement = await incrementRepository.createIncrement(increment);

    const foundIncrement = await incrementRepository.getIncrementById(
      savedIncrement.id,
      false,
    );
    expect(foundIncrement).toBeDefined();
    expect(foundIncrement!.id).toBe(savedIncrement.id);
  });

  it('should return null when getting a non-existent increment by id', async () => {
    const foundIncrement = await incrementRepository.getIncrementById(
      'non-existent-id',
      false,
    );
    expect(foundIncrement).toBeNull();
  });

  it('should return null when getting an increment without submitting an id', async () => {
    const foundIncrement = await incrementRepository.getIncrementById(
      '',
      false,
    );
    expect(foundIncrement).toBeNull();
  });

  it('should get an increment by id with eager flag', async () => {
    const increment = new Increment();
    increment.name = 'Eager Increment';
    increment.productId = productId;
    increment.incrementIndex = 3;
    const savedIncrement = await incrementRepository.createIncrement(increment);

    const foundIncrement = await incrementRepository.getIncrementById(
      savedIncrement.id,
      true,
    );
    expect(foundIncrement).toBeDefined();
    expect(foundIncrement!.id).toBe(savedIncrement.id);
    expect(foundIncrement!.models).toBeDefined();
  });

  it('should update an increment', async () => {
    const increment = new Increment();
    increment.name = 'Update Increment';
    increment.productId = productId;
    increment.incrementIndex = 4;
    const savedIncrement = await incrementRepository.createIncrement(increment);

    savedIncrement.name = 'Updated Increment';
    const updatedIncrement = await incrementRepository.updateIncrement(
      savedIncrement.id,
      savedIncrement,
    );

    expect(updatedIncrement).toBeDefined();
    expect(updatedIncrement!.name).toBe('Updated Increment');
  });

  it('should return null when updating a non-existent increment', async () => {
    const updatedIncrement = await incrementRepository.updateIncrement(
      'non-existent-id',
      { name: 'Updated Increment' },
    );
    expect(updatedIncrement).toBeNull();
  });

  it('should delete an increment', async () => {
    const increment = new Increment();
    increment.name = 'Delete Increment';
    increment.productId = productId;
    increment.incrementIndex = 5;
    const savedIncrement = await incrementRepository.createIncrement(increment);

    await incrementRepository.deleteIncrement(savedIncrement.id);
    const deletedIncrement = await incrementRepository.getIncrementById(
      savedIncrement.id,
      false,
    );

    expect(deletedIncrement).toBeNull();
  });

  it('should not throw an error when deleting a non-existent increment', async () => {
    await expect(
      incrementRepository.deleteIncrement('non-existent-id'),
    ).resolves.not.toThrow();
  });

  it('should get the latest increment for a product', async () => {
    const increment = new Increment();
    increment.name = 'Latest Increment';
    increment.productId = productId;
    increment.incrementIndex = 6;
    await incrementRepository.createIncrement(increment);

    const latestIncrement =
      await incrementRepository.getLatestIncrement(productId);
    expect(latestIncrement).toBeDefined();
    expect(latestIncrement!.name).toBe('Latest Increment');
  });

  it('should return the latest increment across all products if no productId is provided', async () => {
    const increment = new Increment();
    increment.name = 'Global Latest Increment';
    increment.productId = productId;
    increment.incrementIndex = 7;
    await incrementRepository.createIncrement(increment);

    const latestIncrement = await incrementRepository.getLatestIncrement();
    expect(latestIncrement).toBeDefined();
    expect(latestIncrement!.name).toBe('Global Latest Increment');
  });

  it('should return null when getting the latest increment for a non-existent product', async () => {
    const latestIncrement = await incrementRepository.getLatestIncrement(
      'non-existent-product-id',
    );
    expect(latestIncrement).toBeNull();
  });

  it('should get the latest increment id for a product', async () => {
    const latestIncrementId =
      await incrementRepository.getLatestIncrementId(productId);
    expect(latestIncrementId).toBeDefined();
  });

  it('should return null when getting the latest increment id for a non-existent product', async () => {
    const latestIncrementId = await incrementRepository.getLatestIncrementId(
      'non-existent-product-id',
    );
    expect(latestIncrementId).toBeNull();
  });

  it('should throw an error when creating an increment with invalid data', async () => {
    const invalidIncrement = new Increment();
    invalidIncrement.name = '';
    invalidIncrement.productId = 'invalid-uuid';
    invalidIncrement.incrementIndex = -1;

    await expect(
      incrementRepository.createIncrement(invalidIncrement),
    ).rejects.toThrow('Validation failed');
  });

  it('should throw an error when updating an increment with invalid data', async () => {
    const increment = new Increment();
    increment.name = 'Valid Increment';
    increment.productId = productId;
    increment.incrementIndex = 1;
    const savedIncrement = await incrementRepository.createIncrement(increment);

    const updatedIncrement = {
      ...savedIncrement,
      name: '',
      productId: 'invalid-uuid',
      incrementIndex: -1,
    };

    await expect(
      incrementRepository.updateIncrement(savedIncrement.id, updatedIncrement),
    ).rejects.toThrow('Validation failed');
  });
});
