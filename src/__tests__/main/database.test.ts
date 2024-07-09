import { DataSource } from 'typeorm';
import { initializeDataSource, getDataSource, AppDataSource } from '../../main/database';

describe('Database Initialization', () => {
  const databasePath = ':memory:';

  afterEach(async () => {
    if (AppDataSource && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  it('should initialize the data source successfully', async () => {
    const result = await initializeDataSource(databasePath);
    expect(result).toBe(true);
    expect(AppDataSource.isInitialized).toBe(true);
  });

  it('should destroy existing data source before reinitializing', async () => {
    const firstInit = await initializeDataSource(databasePath);
    expect(firstInit).toBe(true);
    expect(AppDataSource.isInitialized).toBe(true);

    const secondInit = await initializeDataSource(databasePath);
    expect(secondInit).toBe(true);
    expect(AppDataSource.isInitialized).toBe(true);
  });

  it('should throw an error if getDataSource is called before initialization', () => {
    expect(() => getDataSource()).toThrow('Database connection is not established');
  });

  it('should return the initialized data source', async () => {
    await initializeDataSource(databasePath);
    const dataSource = getDataSource();
    expect(dataSource).toBeInstanceOf(DataSource);
    expect(dataSource.isInitialized).toBe(true);
  });

  it('should return false if the data source initialization fails', async () => {
    jest.spyOn(DataSource.prototype, 'initialize').mockImplementationOnce(async () => { throw new Error('Initialization failed'); });

    const result = await initializeDataSource(databasePath);
    expect(result).toBe(false);
  });
});
