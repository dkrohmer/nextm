import { AppDataSource } from '../database';
import { Model } from '../models/Model';

export class ModelRepository {
  private modelRepository = AppDataSource.getRepository(Model);

  // async createModel(data: Partial<Model>): Promise<Model> {
  //   const model = this.modelRepository.create(data);
  //   return await this.modelRepository.save(model);
  // }

  async createModel(model: Model): Promise<Model> {
    // const model = this.modelRepository.create(data);
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

    Object.assign(model, data);
    return await this.modelRepository.save(model);
  }

  async deleteModel(id: string): Promise<void> {
    await this.modelRepository.delete(id);
  }
}
