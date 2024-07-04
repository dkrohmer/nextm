import { ResponsibleRepository } from '../repositories/ResponsibleRepository';
import { Responsible } from '../models/Responsible';
import { ProductRepository } from '../repositories/ProductRepository';
import { buildResponsibleEntity } from '../helpers/entityBuilder';

export class ResponsibleService {
  private responsibleRepository = new ResponsibleRepository();

  private productRepository = new ProductRepository();

  async createResponsible(data: any): Promise<Responsible> {
    const { productId } = data;

    const product = await this.productRepository.getProductById(
      productId,
      false,
    );
    if (!product) {
      throw new Error('Product not found');
    }

    const responsible: Responsible = buildResponsibleEntity(data);
    responsible.productId = productId;

    return await this.responsibleRepository.createResponsible(responsible);
  }

  async getAllResponsibles(
    productId?: string,
  ): Promise<{ responsibles: Responsible[]; responsiblesCount: number }> {
    const [responsibles, responsiblesCount] =
      await this.responsibleRepository.getAllResponsibles(productId);
    return { responsibles, responsiblesCount };
  }

  async getResponsibleById(id: string): Promise<Responsible | null> {
    return await this.responsibleRepository.getResponsibleById(id);
  }

  async updateResponsible(
    id: string,
    data: Partial<Responsible>,
  ): Promise<Responsible | null> {
    return await this.responsibleRepository.updateResponsible(id, data);
  }

  async deleteResponsible(id: string): Promise<void> {
    await this.responsibleRepository.deleteResponsible(id);
  }
}
