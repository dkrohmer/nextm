import { DataSource } from 'typeorm';

import { Product } from './models/Product';
import { Increment } from './models/Increment';
import { Model } from './models/Model';
import { Version } from './models/Version';
import { Responsible } from './models/Responsible';
import { IncrementController } from './controllers/IncrementController';
import { ModelController } from './controllers/ModelController';
import { ProductController } from './controllers/ProductController';
import { VersionController } from './controllers/VersionController';

export let AppDataSource: DataSource;
// export const AppDataSource = new DataSource({
//   type: 'sqlite',
//   database: 'database.sqlite',
//   synchronize: true,
//   logging: false,
//   entities: [Product, Responsible, Increment],
// });

export const initializeDataSource = async (databasePath: string) => {
  console.log(`Initializing data source with database path: ${databasePath}`);

  if (AppDataSource && AppDataSource.isInitialized) {
    console.log("Destroying existing data source...");
    await AppDataSource.destroy();
  }

  AppDataSource = new DataSource({
    type: 'sqlite',
    database: databasePath,
    synchronize: true,
    logging: false,
    entities: [
      Product,
      Increment,
      Model,
      Version,
      Responsible
    ],
    migrations: [],
    subscribers: [],
  });

  const response = await AppDataSource.initialize();

  if (response) {
    console.log("Data source initialized successfully at: ", databasePath);
    return true
  } else {
    return false;
  }
};

export function getDataSource() {
  if (!AppDataSource || !AppDataSource.isInitialized) {
    throw new Error('Database connection is not established');
  }
  return AppDataSource;
}
