import { validate } from 'class-validator';
import { AppDataSource } from '../database';
import { Model } from '../models/Model';

export class ModelRepository {
  private modelRepository = AppDataSource.getRepository(Model);

  async createModel(model: Model): Promise<Model> {
    const validationErrors = await validate(model);

    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      throw new Error('Validation failed');
    }

    return await this.modelRepository.save(model);
  }

  async getAllModels(
    sortBy: string,
    sort: 'asc' | 'desc',
    incrementId?: string,
  ): Promise<[Model[], number]> {
    const where = incrementId ? { incrementId } : {};

    return await this.modelRepository.findAndCount({
      where,
      order: {
        [sortBy]: sort,
      },
      relations: [],
    });
  }

  async getModelById(id: string, eager: boolean): Promise<Model | null> {
    if (eager) {
      return await this.modelRepository.findOne({
        where: { id },
        relations: ['versions'],
      });
    }
    return await this.modelRepository.findOne({
      where: { id },
      relations: [],
    });
  }

  async updateModel(id: string, data: Partial<Model>): Promise<Model | null> {
    const model = await this.modelRepository.findOneBy({ id });
    if (!model) {
      return null;
    }

    const updatedModel = this.modelRepository.merge(model, data);

    const validationErrors = await validate(updatedModel);
    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      throw new Error('Validation failed');
    }

    return await this.modelRepository.save(updatedModel);
  }

  async deleteModel(id: string): Promise<void> {
    await this.modelRepository.delete(id);
  }
}
