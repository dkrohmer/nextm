import { ipcMain } from 'electron';
import { ModelService } from '../services/ModelService';

function validateSortBy(sortBy: string): boolean {
  const validSortByFields = ['name', 'createdAt'];
  return validSortByFields.includes(sortBy);
}

function validateSortDirection(sort: string): boolean {
  return ['asc', 'desc'].includes(sort);
}

export class ModelController {
  private modelService: ModelService;

  constructor() {
    this.modelService = new ModelService();
    this.initializeModelHandlers();
  }

  destroy() {
    ipcMain.removeHandler('create-model');
    ipcMain.removeHandler('get-all-models');
    ipcMain.removeHandler('get-model-by-id');
    ipcMain.removeHandler('update-model');
    ipcMain.removeHandler('delete-model');
  }

  private initializeModelHandlers() {
    /**
     * create-model
     */
    ipcMain.handle('create-model', async (_event, data) => {
      try {
        const model = await this.modelService.createModel(data);
        return model;
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * get-all-models
     */
    ipcMain.handle('get-all-models', async (_event, data) => {
      try {
        let sort = data.sort as 'asc' | 'desc';
        let sortby = (data.sortby as string) || 'createdAt';
        const incrementId = data.incrementId as string | undefined;

        if (!validateSortBy(sortby)) {
          sortby = 'createdAt';
        }

        if (!validateSortDirection(sort)) {
          sort = 'desc';
        }

        const { models, modelsCount } = await this.modelService.getAllModels(
          sortby,
          sort,
          incrementId,
        );
        return models;
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * get-model-by-id
     */
    ipcMain.handle('get-model-by-id', async (_event, data) => {
      try {
        const { modelId } = data;
        const { isEagerLoading }: { isEagerLoading: boolean } = data;

        const model = await this.modelService.getModelById(
          modelId,
          isEagerLoading,
        );
        if (model) {
          return model;
        }
        throw new Error('Failed to get model');
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * update-model
     */
    ipcMain.handle('update-model', async (_event, data) => {
      try {
        const { id }: { id: string } = data;
        const { name }: { name: string } = data;

        const updatedModel = await this.modelService.updateModel(id, { name });
        if (updatedModel) {
          return updatedModel;
        }
        throw new Error('Failed to update model');
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * delete-model
     */
    ipcMain.handle('delete-model', async (_event, data) => {
      try {
        const { modelId } = data;
        await this.modelService.deleteModel(modelId);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
