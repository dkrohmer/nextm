import { Increment } from '../models/Increment';
import { IncrementRepository } from '../repositories/IncrementRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { buildIncrementEntity } from '../helpers/entityBuilder';

export class IncrementService {
  private incrementRepository = new IncrementRepository();
  private productRepository = new ProductRepository();

  /**
   * create increment
   */
  async createIncrement(data: Increment): Promise<Increment> {
    const { productId } = data;

    const product = await this.productRepository.getProductById(
      productId,
      false,
    );
    if (!product) {
      throw new Error('Product not found');
    }

    const latestIncrement =
      await this.incrementRepository.getLatestIncrement(productId);
    const newIncrementIndex = latestIncrement
      ? latestIncrement.incrementIndex + 1
      : 0;

    const increment: Increment = buildIncrementEntity(
      { ...data, incrementIndex: null },
      newIncrementIndex,
    );
    increment.productId = productId;

    const newIncrement =
      await this.incrementRepository.createIncrement(increment);
    const serializedNewIncrement = newIncrement.toJSON();

    return serializedNewIncrement;
  }

  /**
   * get all increments
   */
  async getAllIncrements(
    sortBy: string,
    sort: 'asc' | 'desc',
    productId?: string,
  ): Promise<{ increments: Increment[]; incrementsCount: number }> {
    const [increments, incrementsCount] =
      await this.incrementRepository.getAllIncrements(sortBy, sort, productId);
    const serializedIncrements = increments.map((increment) =>
      increment.toJSON(),
    );
    return { increments: serializedIncrements, incrementsCount };
  }

  /**
   * get one increment
   */
  async getIncrementById(
    id: string,
    eager: boolean,
  ): Promise<Increment | null> {
    const increment = await this.incrementRepository.getIncrementById(
      id,
      eager,
    );
    const serializedIncrement = increment!.toJSON();
    return serializedIncrement;
  }

  /**
   * get latest increment
   */
  async getLatestIncrement(productId?: string): Promise<Increment | null> {
    const increment =
      await this.incrementRepository.getLatestIncrement(productId);
    const serializedIncrement = increment!.toJSON();
    return serializedIncrement;
  }

  /**
   * update increment
   */
  async updateIncrement(
    id: string,
    data: Partial<Increment>,
  ): Promise<Increment | null> {
    const increment = await this.incrementRepository.updateIncrement(id, data);
    const serializedIncrement = increment!.toJSON();
    return serializedIncrement;
  }

  /**
   * delete increment
   */
  async deleteIncrement(id: string): Promise<void> {
    await this.incrementRepository.deleteIncrement(id);
  }
}
