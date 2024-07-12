import { ProductRepository } from '../repositories/ProductRepository';
// import { ResponsibleRepository } from '../repositories/ResponsibleRepository';
// import { IncrementService } from './IncrementService';
import { Product } from '../models/Product';
import { Responsible } from '../models/Responsible';

import {
  buildProductEntity,
  buildResponsibleEntity,
} from '../helpers/entityBuilder';
import { ResponsibleRepository } from '../repositories/ResponsibleRepository';
import { IncrementRepository } from '../repositories/IncrementRepository';

export class ProductService {
  private productRepository = new ProductRepository();

  private responsibleRepository = new ResponsibleRepository();

  private incrementRepository = new IncrementRepository();

  async createProduct(data: Product): Promise<Product | null> {
    const product: Product = buildProductEntity(data);
    const newProduct = await this.productRepository.createProduct(product);
    const serializedProduct = newProduct.toJSON();

    return serializedProduct;
  }

  async getAllProducts(
    limit: number,
    offset: number,
    sort: 'asc' | 'desc',
    sortby: string,
  ): Promise<{ products: Product[]; productsCount: number }> {
    const [products, count] = await this.productRepository.getAllProducts(
      limit,
      offset,
      sort,
      sortby,
    );

    for (const product of products) {
      product.latestIncrementId =
        await this.incrementRepository.getLatestIncrementId(product.id);
    }
    const serializedProducts = products.map((product) => product.toJSON());

    return { products: serializedProducts, productsCount: count };
  }

  async getProductById(id: string, eager: boolean): Promise<Product | null> {
    const product = await this.productRepository.getProductById(id, eager);
    if (!product) {
      throw new Error('Product not found');
    }
    const serializedProduct = product.toJSON();
  
    return serializedProduct;
  }
  
  async updateProduct(id: string, data: any) {
    const { responsibles } = data;
  
    console.log("New product data from ProductService");
    console.log(data);
  
    const product = await this.productRepository.getProductById(id, false);
  
    if (!product) {
      throw new Error('Product not found');
    }
  
    console.log("Existing product data from ProductService");
    console.log(product);
  
    let filteredResponsibles: Responsible[] = [];
    if (responsibles) {
      filteredResponsibles = responsibles.filter((resp: Responsible) => {
        return (resp.firstName && resp.lastName) && {
          ...resp,
          role: resp.role || null,
        };
      });
    }
  
    const existingResponsibles = product.responsibles;
  
    if (existingResponsibles && filteredResponsibles.length > 0) {
      const existingResponsibleMap = new Map(
        existingResponsibles.map((resp: any) => [resp.id, resp]),
      );
      const newResponsibleMap = new Map(
        filteredResponsibles.map((resp: any) => [resp.id, resp]),
      );
  
      for (const existingResponsible of existingResponsibles) {
        if (!newResponsibleMap.has(existingResponsible.id)) {
          await this.responsibleRepository.deleteResponsible(
            existingResponsible.id,
          );
        }
      }
  
      for (const newResponsible of filteredResponsibles) {
        if (existingResponsibleMap.has(newResponsible.id)) {
          const existingResponsible = existingResponsibleMap.get(
            newResponsible.id,
          );
          if (
            existingResponsible!.firstName !== newResponsible.firstName ||
            existingResponsible!.lastName !== newResponsible.lastName ||
            existingResponsible!.role !== newResponsible.role
          ) {
            await this.responsibleRepository.updateResponsible(
              newResponsible.id,
              newResponsible,
            );
          }
        } else {
          const responsibleEntity = buildResponsibleEntity(newResponsible);
          responsibleEntity.productId = product.id;
          await this.responsibleRepository.createResponsible(responsibleEntity);
          product.responsibles.push(responsibleEntity);
        }
      }
    }
  
    const { responsibles: _, ...productData } = data;
    return this.productRepository.updateProduct(product.id, productData);
  }
  
  
  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }
}
