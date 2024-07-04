import { AppDataSource } from '../database';
import { Responsible } from '../models/Responsible';

export class ResponsibleRepository {
  private responsibleRepository = AppDataSource.getRepository(Responsible);

  async createResponsible(responsible: Responsible): Promise<Responsible> {
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

  async updateResponsible(
    id: string,
    data: Partial<Responsible>,
  ): Promise<Responsible | null> {
    const responsible = await this.responsibleRepository.findOneBy({ id });
    if (!responsible) {
      return null;
    }

    Object.assign(responsible, data);
    return await this.responsibleRepository.save(responsible);
  }

  async deleteResponsible(id: string): Promise<void> {
    await this.responsibleRepository.delete(id);
  }
}
