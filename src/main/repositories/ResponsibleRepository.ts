import { validate } from 'class-validator';
import { AppDataSource } from '../database';
import { Responsible } from '../models/Responsible';

export class ResponsibleRepository {
  private responsibleRepository = AppDataSource.getRepository(Responsible);

  async createResponsible(responsible: Responsible): Promise<Responsible> {
    const validationErrors = await validate(responsible);

    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      throw new Error('Validation failed');
    }

    return await this.responsibleRepository.save(responsible);
  }

  async getAllResponsibles(
    productId?: string,
  ): Promise<[Responsible[], number]> {
    if (productId) {
      return await this.responsibleRepository.findAndCount({
        where: { productId },
      });
    }
    return await this.responsibleRepository.findAndCount();
  }

  async getResponsibleById(id: string): Promise<Responsible | null> {
    return await this.responsibleRepository.findOneBy({ id });
  }

  async updateResponsible(id: string, data: Partial<Responsible>): Promise<Responsible | null> {
    const responsible = await this.responsibleRepository.findOneBy({ id });
    if (!responsible) {
      return null;
    }

    const updatedResponsible = this.responsibleRepository.merge(responsible, data);

    const validationErrors = await validate(updatedResponsible);
    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      throw new Error('Validation failed');
    }

    return await this.responsibleRepository.save(updatedResponsible);
  }

  async deleteResponsible(id: string): Promise<void> {
    await this.responsibleRepository.delete(id);
  }
}
