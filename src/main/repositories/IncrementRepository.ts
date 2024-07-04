import { AppDataSource } from '../database';
import { Increment } from '../models/Increment';

export class IncrementRepository {
  private incrementRepository = AppDataSource.getRepository(Increment);

  async createIncrement(increment: Increment): Promise<Increment> {
    return await this.incrementRepository.save(increment);
  }

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

  async getLatestIncrement(productId?: string): Promise<Increment | null> {
    const where = productId ? { productId } : {};

    return await this.incrementRepository.findOne({
      where,
      order: {
        incrementIndex: 'DESC',
      },
    });
  }

  async getLatestIncrementId(productId: string): Promise<string | null> {
    const latestIncrement = await AppDataSource.getRepository(
      'Increment',
    ).findOne({
      where: { product: { id: productId } },
      order: { incrementIndex: 'DESC' },
    });

    return latestIncrement?.id || null;
  }

  async updateIncrement(
    id: string,
    data: Partial<Increment>,
  ): Promise<Increment | null> {
    const increment = await this.incrementRepository.findOneBy({ id });
    if (!increment) {
      return null;
    }
    Object.assign(increment, data);
    return await this.incrementRepository.save(increment);
  }

  async deleteIncrement(id: string): Promise<void> {
    await this.incrementRepository.delete(id);
  }
}
