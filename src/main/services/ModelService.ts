import { ModelRepository } from '../repositories/ModelRepository';
import { Model } from '../models/Model';
import { buildModelEntity } from '../helpers/entityBuilder';
import { IncrementRepository } from '../repositories/IncrementRepository';

export class ModelService {
  private modelRepository = new ModelRepository();

  private incrementRepository = new IncrementRepository();

  async createModel(data: any): Promise<Model> {
    const { incrementId } = data;

    const increment = await this.incrementRepository.getIncrementById(
      incrementId,
      false,
    );
    if (!increment) {
      throw new Error('Product not found');
    }

    const model: Model = buildModelEntity(data);
    model.incrementId = incrementId;

    const newModel = await this.modelRepository.createModel(model);
    const serializedNewModel = newModel.toJSON();

    return serializedNewModel;
  }

  async getAllModels(
    sortBy: string,
    sort: 'asc' | 'desc',
    incrementId?: string,
  ): Promise<{ models: Model[]; modelsCount: number }> {
    const [models, modelsCount] = await this.modelRepository.getAllModels(
      sortBy,
      sort,
      incrementId,
    );
    const serializedModels = models.map((model) => model.toJSON());
    return { models: serializedModels, modelsCount };
  }

  async getModelById(id: string, eager: boolean): Promise<Model | null> {
    const model = await this.modelRepository.getModelById(id, eager);
    const serializedModel = model!.toJSON();
    return serializedModel;
  }

  async updateModel(id: string, data: Partial<Model>): Promise<Model | null> {
    const model = await this.modelRepository.updateModel(id, data);
    const serializedModel = model!.toJSON();
    return serializedModel;
  }

  async deleteModel(id: string): Promise<void> {
    await this.modelRepository.deleteModel(id);
  }
}
