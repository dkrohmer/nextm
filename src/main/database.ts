// database.ts
import { DataSource } from 'typeorm';

import { Product } from './models/Product';
import { Increment } from './models/Increment';
import { Model } from './models/Model';
import { Version } from './models/Version';
import { Responsible } from './models/Responsible';

export let AppDataSource: DataSource;

export const initializeDataSource = async (databasePath: string) => {
  console.log(`Initializing data source with database path: ${databasePath}`);

  if (AppDataSource && AppDataSource.isInitialized) {
    console.log('Destroying existing data source...');
    await AppDataSource.destroy();
  }

  AppDataSource = new DataSource({
    type: 'sqlite',
    database: databasePath,
    synchronize: true,
    logging: false,
    entities: [Product, Increment, Model, Version, Responsible],
    migrations: [],
    subscribers: [],
  });

  try {
    await AppDataSource.initialize();
    console.log('Data source initialized successfully at: ', databasePath);
    return true;
  } catch (error) {
    console.error('Data source initialization failed: ', error);
    return false;
  }
};

export function getDataSource() {
  if (!AppDataSource || !AppDataSource.isInitialized) {
    throw new Error('Database connection is not established');
  }
  return AppDataSource;
}
