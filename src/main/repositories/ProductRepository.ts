import { AppDataSource } from '../database';
import { Product } from '../models/Product';
// import { Responsible } from '../models/Responsible';

export class ProductRepository {
  private productRepository = AppDataSource.getRepository(Product);
  // private responsibleRepository = AppDataSource.getRepository(Responsible);

  async createProduct(product: Product): Promise<Product> {
    const newProduct = await this.productRepository.save(product);
    return newProduct;
  }

  async getAllProducts(
    limit: number,
    offset: number,
    sort: 'asc' | 'desc',
    sortby: string,
  ): Promise<[Product[], number]> {
    const [products, count] = await this.productRepository.findAndCount({
      relations: ['responsibles'],
      take: limit,
      skip: offset,
      order: {
        [sortby]: sort,
      },
    });

    return [products, count];
  }

  async getProductById(id: string, eager: boolean): Promise<Product | null> {
    if (!id) {
      return null;
    }

    if (eager) {
      return await this.productRepository.findOne({
        where: { id },
        relations: [
          'responsibles',
          'increments',
          'increments.models',
          'increments.models.versions',
        ],
      });
    }
    return await this.productRepository.findOne({
      where: { id },
      relations: ['responsibles'],
    });
  }

  async updateProduct(id: string, data: any): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      return null;
    }
    return await this.productRepository.save(data);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.delete({ id });
  }
}
