import { validate } from 'class-validator';
import { AppDataSource } from '../database';
import { Product } from '../models/Product';

export class ProductRepository {
  private productRepository = AppDataSource.getRepository(Product);

  /**
   * create product
   */
  async createProduct(product: Product): Promise<Product> {
    const validationErrors = await validate(product);

    if (validationErrors.length > 0) {
      console.error(validationErrors);
      throw new Error('Validation failed');
    }

    const newProduct = await this.productRepository.save(product);
    return newProduct;
  }

  /**
   * get all products
   */
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

  /**
   * get one product
   */
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

  /**
   * update product
   */
  async updateProduct(
    id: string,
    data: Partial<Product>,
  ): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      return null;
    }

    const updatedProduct = this.productRepository.merge(product, data);

    const validationErrors = await validate(updatedProduct);
    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      throw new Error('Validation failed');
    }

    return await this.productRepository.save(updatedProduct);
  }

  /**
   * delete product
   */
  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.delete({ id });
  }
}
