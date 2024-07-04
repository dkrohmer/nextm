import { IncrementRepository } from '../repositories/IncrementRepository';
import { Increment } from '../models/Increment';
import { ProductRepository } from '../repositories/ProductRepository';
import { buildIncrementEntity } from '../helpers/entityBuilder';

export class IncrementService {
  private incrementRepository = new IncrementRepository();

  private productRepository = new ProductRepository();

  async createIncrement(data: Increment): Promise<Increment> {
    const { productId } = data;

    const product = await this.productRepository.getProductById(
      productId,
      false,
    );
    if (!product) {
      throw new Error('Product not found');
    }

    // Find the latest version number for the given modelId
    const latestIncrement =
      await this.incrementRepository.getLatestIncrement(productId);
    // Set the new version number
    const newIncrementIndex = latestIncrement
      ? latestIncrement.incrementIndex + 1
      : 0;
    // increment.incrementIndex = newIncrementIndex

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

  async getLatestIncrement(productId?: string): Promise<Increment | null> {
    const increment =
      await this.incrementRepository.getLatestIncrement(productId);
    const serializedIncrement = increment!.toJSON();
    return serializedIncrement;
  }

  async updateIncrement(
    id: string,
    data: Partial<Increment>,
  ): Promise<Increment | null> {
    const increment = await this.incrementRepository.updateIncrement(id, data);
    const serializedIncrement = increment!.toJSON();
    return serializedIncrement;
  }

  async deleteIncrement(id: string): Promise<void> {
    await this.incrementRepository.deleteIncrement(id);
  }
}
