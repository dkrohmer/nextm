import { validate } from 'class-validator';
import { AppDataSource } from '../database';
import { Increment } from '../models/Increment';

export class IncrementRepository {
  private incrementRepository = AppDataSource.getRepository(Increment);

  /**
   * create increment
   */
  async createIncrement(increment: Increment): Promise<Increment> {
    const validationErrors = await validate(increment);

    if (validationErrors.length > 0) {
      console.error(validationErrors);
      throw new Error('Validation failed');
    }

    const newIncrement = await this.incrementRepository.save(increment);
    return newIncrement;
  }

  /**
   * get all incremennts
   */
  async getAllIncrements(
    sortBy: string,
    sort: 'asc' | 'desc',
    productId?: string,
  ): Promise<[Increment[], number]> {
    const where = productId ? { productId } : {};

    const [increments, count] = await this.incrementRepository.findAndCount({
      where,
      relations: [],
      order: {
        [sortBy]: sort,
      },
    });

    return [increments, count];
  }
  
  /**
   * get one increment
   */
  async getIncrementById(
    id: string,
    eager: boolean,
  ): Promise<Increment | null> {
    if (eager) {
      return await this.incrementRepository.findOne({
        where: { id },
        relations: ['models', 'models.versions'],
      });
    }
    return await this.incrementRepository.findOne({
      where: { id },
      relations: [],
    });
  }

  /**
   * get latest increment
   */
  async getLatestIncrement(productId?: string): Promise<Increment | null> {
    const where = productId ? { productId } : {};

    return await this.incrementRepository.findOne({
      where,
      order: {
        incrementIndex: 'DESC',
      },
    });
  }

  /**
   * get latest increment ID
   */
  async getLatestIncrementId(productId: string): Promise<string | null> {
    const latestIncrement = await AppDataSource.getRepository(
      'Increment',
    ).findOne({
      where: { product: { id: productId } },
      order: { incrementIndex: 'DESC' },
    });

    return latestIncrement?.id || null;
  }

  /**
   * update increment
   */
  async updateIncrement(
    id: string,
    data: Partial<Increment>,
  ): Promise<Increment | null> {
    const increment = await this.incrementRepository.findOneBy({ id });
    if (!increment) {
      return null;
    }

    const updatedIncrement = this.incrementRepository.merge(increment, data);

    const validationErrors = await validate(updatedIncrement);
    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      throw new Error('Validation failed');
    }

    return await this.incrementRepository.save(updatedIncrement);
  }

  /**
   * delete increment
   */
  async deleteIncrement(id: string): Promise<void> {
    await this.incrementRepository.delete(id);
  }
}
