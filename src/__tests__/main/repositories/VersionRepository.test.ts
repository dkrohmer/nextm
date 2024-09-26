import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Model } from '../../../main/models/Model';
import { initializeDataSource, getDataSource } from '../../../main/database';
import { VersionRepository } from '../../../main/repositories/VersionRepository';
import { Product } from '../../../main/models/Product';
import { Increment } from '../../../main/models/Increment';

let dataSource: DataSource;
let versionRepository: VersionRepository;
let modelId: string;

beforeAll(async () => {
  await initializeDataSource(':memory:');
  dataSource = getDataSource();
  versionRepository = new VersionRepository();

  const product = new Product();
  product.name = 'Test Product';
  const savedProduct = await dataSource.getRepository(Product).save(product);

  const increment = new Increment();
  increment.name = 'Test Increment';
  increment.incrementIndex = 1;
  increment.product = savedProduct;
  const savedIncrement = await dataSource
    .getRepository(Increment)
    .save(increment);

  const model = new Model();
  model.name = 'Test Model';
  model.increment = savedIncrement;
  const savedModel = await dataSource.getRepository(Model).save(model);
  modelId = savedModel.id;
});

afterAll(async () => {
  await dataSource.destroy();
});

describe('VersionRepository', () => {
  it('should create a new version', async () => {
    const version = {
      payload: JSON.stringify({ key: 'value' }),
      modelId,
      versionIndex: 1,
      thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      x: 1.0,
      y: 2.0,
      height: 10.0,
      width: 20.0,
    };

    const savedVersion = await versionRepository.createVersion(version);

    expect(savedVersion).toHaveProperty('id');
    expect(savedVersion.payload).toBe(JSON.stringify({ key: 'value' }));
    expect(savedVersion.modelId).toBe(modelId);
    expect(savedVersion.thumbnail).toContain('data:image/png;base64,');
  });

  it('should get all versions sorted by payload', async () => {
    const [versions, count] = await versionRepository.getAllVersions(
      'payload',
      'asc',
    );

    expect(Array.isArray(versions)).toBe(true);
    expect(typeof count).toBe('number');
    expect(count).toBeGreaterThan(0);
  });

  it('should get all versions for a modelId', async () => {
    const [versions, count] = await versionRepository.getAllVersions(
      'payload',
      'asc',
      modelId,
    );

    expect(Array.isArray(versions)).toBe(true);
    expect(count).toBeGreaterThan(0);
    versions.forEach((version) => expect(version.modelId).toBe(modelId));
  });

  it('should get a version by id', async () => {
    const version = {
      payload: JSON.stringify({ key: 'FindByID' }),
      modelId,
      versionIndex: 2,
      thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      x: 1.0,
      y: 2.0,
      height: 10.0,
      width: 20.0,
    };
    const savedVersion = await versionRepository.createVersion(version);

    const foundVersion = await versionRepository.getVersionById(
      savedVersion.id,
    );
    expect(foundVersion).toBeDefined();
    expect(foundVersion!.id).toBe(savedVersion.id);
  });

  it('should return null when getting a non-existent version by id', async () => {
    const foundVersion =
      await versionRepository.getVersionById('non-existent-id');
    expect(foundVersion).toBeNull();
  });

  it('should get the latest version by modelId', async () => {
    const version = {
      payload: JSON.stringify({ key: 'Latest Version' }),
      modelId,
      versionIndex: 3,
      thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      x: 1.0,
      y: 2.0,
      height: 10.0,
      width: 20.0,
    };
    await versionRepository.createVersion(version);

    const latestVersion =
      await versionRepository.getLatestVersionByModelId(modelId);
    expect(latestVersion).toBeDefined();
    expect(latestVersion!.payload).toBe(
      JSON.stringify({ key: 'Latest Version' }),
    );
  });

  it('should count the number of versions by modelId', async () => {
    const count = await versionRepository.countVersionsByModelId(modelId);
    expect(count).toBeGreaterThan(0);
  });

  it('should delete the earliest version by modelId', async () => {
    await versionRepository.deleteEarliestVersionByModelId(modelId);
    const earliestVersion =
      await versionRepository.getLatestVersionByModelId(modelId);
    expect(earliestVersion!.versionIndex).not.toBe(1);
  });

  it('should delete a version', async () => {
    const version = {
      payload: JSON.stringify({ key: 'Delete Version' }),
      modelId,
      versionIndex: 4,
      thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      x: 1.0,
      y: 2.0,
      height: 10.0,
      width: 20.0,
    };
    const savedVersion = await versionRepository.createVersion(version);

    await versionRepository.deleteVersion(savedVersion.id);
    const deletedVersion = await versionRepository.getVersionById(
      savedVersion.id,
    );

    expect(deletedVersion).toBeNull();
  });

  it('should not throw an error when deleting a non-existent version', async () => {
    await expect(
      versionRepository.deleteVersion('non-existent-id'),
    ).resolves.not.toThrow();
  });

  describe('getLatestVersionThumbnailByModelId', () => {
    it('should return the latest version thumbnail for a model', async () => {
      const version = {
        payload: JSON.stringify({ key: 'Thumbnail Test' }),
        modelId,
        versionIndex: 5,
        thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
        x: 1.0,
        y: 2.0,
        height: 10.0,
        width: 20.0,
      };
      await versionRepository.createVersion(version);
      const thumbnail =
        await versionRepository.getLatestVersionThumbnailByModelId(modelId);
      expect(thumbnail).toBe(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      );
    });

    it('should return null if no version is found for the modelId', async () => {
      const nonExistentModelId = uuidv4();
      const thumbnail =
        await versionRepository.getLatestVersionThumbnailByModelId(
          nonExistentModelId,
        );
      expect(thumbnail).toBeNull();
    });

    it('should throw an error when validation fails', async () => {
      const invalidVersion = {
        payload: 'Invalid Payload',
        modelId,
        versionIndex: 1,
        thumbnail: 'invalid-thumbnail',
        x: 1.0,
        y: 2.0,
        height: 10.0,
        width: 20.0,
      };

      await expect(
        versionRepository.createVersion(invalidVersion),
      ).rejects.toThrow('Validation failed');
    });
  });
});
