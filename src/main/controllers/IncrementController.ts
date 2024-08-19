// src/controllers/ProductController.ts

import { ipcMain } from 'electron';
import { IncrementService } from '../services/IncrementService';
import { Increment } from '../models/Increment';

function validateSortBy(sortBy: string): boolean {
  const validSortByFields = [
    'name',
    'createdAt',
    'start',
    'end',
    'incrementIndex',
  ];
  return validSortByFields.includes(sortBy);
}

function validateSortDirection(sort: string): boolean {
  return ['asc', 'desc'].includes(sort);
}

// src/controllers/IncrementController.ts
export class IncrementController {
  private incrementService: IncrementService;

  constructor() {
    this.incrementService = new IncrementService();
    this.initializeIncrementHandlers();
  }

  destroy() {
    ipcMain.removeHandler('create-increment');
    ipcMain.removeHandler('get-all-increments');
    ipcMain.removeHandler('get-increment-by-id');
    ipcMain.removeHandler('get-latest-increment');
    ipcMain.removeHandler('update-increment');
    ipcMain.removeHandler('delete-increment');
  }

  private initializeIncrementHandlers() {
    /**
     * create-increment
     */
    ipcMain.handle('create-increment', async (_event, data: Increment) => {
      try {
        const increment = await this.incrementService.createIncrement(data);
        return increment;
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * get-all-increments
     */
    ipcMain.handle('get-all-increments', async (_event, data) => {
      try {
        let { sort }: { sort: 'asc' | 'desc' } = data;
        let { sortby }: { sortby: string } = data;
        sortby = sortby || 'createdAt';
        const { productId }: { productId: string | undefined } = data;
        // let sort = data.sort as 'asc' | 'desc';
        // let sortby = data.sortby as string || 'createdAt';
        // const productId = data.productId as string | undefined;

        if (!validateSortBy(sortby)) {
          sortby = 'createdAt'; // default sort field if invalid
        }

        if (!validateSortDirection(sort)) {
          sort = 'desc'; // Default to ascending if invalid
        }

        const { increments, incrementsCount } =
          await this.incrementService.getAllIncrements(sortby, sort, productId);
        return { increments, incrementsCount };
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * get-increment-by-id
     */
    ipcMain.handle('get-increment-by-id', async (_event, data) => {
      try {
        const { incrementId }: { incrementId: string } = data;
        const { isEagerLoading }: { isEagerLoading: boolean } = data;

        const increment = await this.incrementService.getIncrementById(
          incrementId,
          isEagerLoading,
        );

        if (increment) {
          return increment;
        }
        throw new Error('Failed to get increment');
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * get-latest-increment
     */
    ipcMain.handle('get-latest-increment', async (_event, data) => {
      try {
        const { productId }: { productId: string | undefined } = data;
        const latestIncrement =
          await this.incrementService.getLatestIncrement(productId);

        if (latestIncrement) {
          return latestIncrement;
        }
        throw new Error('Failed to get latest increment.');
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * update-increment
     */
    ipcMain.handle('update-increment', async (_event, data) => {
      try {
        const { incrementId }: { incrementId: string } = data;
        const { name }: { name: string } = data;

        const updatedIncrement = await this.incrementService.updateIncrement(
          incrementId,
          { name },
        );
        if (updatedIncrement) {
          return updatedIncrement;
        }
        throw new Error('Failed to update increment');
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * delete-increment
     */
    ipcMain.handle('delete-increment', async (_event, data) => {
      try {
        const { incrementId }: { incrementId: string } = data;
        await this.incrementService.deleteIncrement(incrementId);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
