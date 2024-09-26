import { ipcMain } from 'electron';
import { ProductService } from '../services/ProductService';
import { Product } from '../models/Product';

function validateSortBy(sortby: string): boolean {
  const validSortByFields = [
    'name',
    'createdAt',
    'description',
    'startsAt',
    'endsAt',
  ];
  return validSortByFields.includes(sortby);
}

function validateSortDirection(sort: string): boolean {
  return ['asc', 'desc'].includes(sort);
}

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
    this.initializeProductHandlers();
  }

  destroy() {
    ipcMain.removeHandler('create-product');
    ipcMain.removeHandler('get-all-products');
    ipcMain.removeHandler('get-product-by-id');
    ipcMain.removeHandler('update-product');
    ipcMain.removeHandler('delete-product');
  }

  private initializeProductHandlers() {
    /**
     * get-all-products
     */
    ipcMain.handle('get-all-products', async (_event, data) => {
      try {
        const limit = parseInt(data.limit as string) || 10;
        const offset = parseInt(data.offset as string) || 0;
        let sort = data.sort as 'asc' | 'desc';
        let sortby = (data.sortby as string) || 'createdAt';

        if (!validateSortBy(sortby)) {
          sortby = 'createdAt';
        }

        if (!validateSortDirection(sort)) {
          sort = 'desc';
        }

        const { products, productsCount } =
          await this.productService.getAllProducts(limit, offset, sort, sortby);
        return { products, productsCount };
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * get-product-by-id
     */
    ipcMain.handle('get-product-by-id', async (_event, data) => {
      try {
        const { productId } = data;
        const { isEagerLoading }: { isEagerLoading: boolean } = data;

        const product = await this.productService.getProductById(
          productId,
          isEagerLoading,
        );

        if (product) {
          return product;
        }
        throw new Error('Failed to get product');
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * create-product
     */
    ipcMain.handle('create-product', async (_event, data: Product) => {
      try {
        const result = await this.productService.createProduct(data);
        return result;
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * update-product
     */
    ipcMain.handle('update-product', async (_event, data) => {
      try {
        const { productId }: { productId: string } = data;
        const { product }: { product: any } = data;

        const { increments, ...filteredProduct } = product; // we don't want increments to be included

        const updatedProduct = await this.productService.updateProduct(
          productId,
          filteredProduct,
        );

        if (updatedProduct) {
          return updatedProduct;
        }
        throw new Error('Failed to update product');
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * delete-product
     */
    ipcMain.handle('delete-product', async (_event, data) => {
      try {
        const { productId }: { productId: string } = data;
        await this.productService.deleteProduct(productId);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
