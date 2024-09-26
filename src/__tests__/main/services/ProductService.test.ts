import { ProductService } from '../../../main/services/ProductService';
import { ProductRepository } from '../../../main/repositories/ProductRepository';
import { ResponsibleRepository } from '../../../main/repositories/ResponsibleRepository';
import { IncrementRepository } from '../../../main/repositories/IncrementRepository';
import { Product } from '../../../main/models/Product';
import { Responsible } from '../../../main/models/Responsible';
import {
  buildProductEntity,
  buildResponsibleEntity,
} from '../../../main/helpers/entityBuilder';
import 'reflect-metadata';

jest.mock('../../../main/repositories/ProductRepository');
jest.mock('../../../main/repositories/ResponsibleRepository');
jest.mock('../../../main/repositories/IncrementRepository');
jest.mock('../../../main/helpers/entityBuilder');

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: jest.Mocked<ProductRepository>;
  let responsibleRepository: jest.Mocked<ResponsibleRepository>;
  let incrementRepository: jest.Mocked<IncrementRepository>;

  beforeEach(() => {
    productRepository =
      new ProductRepository() as jest.Mocked<ProductRepository>;
    responsibleRepository =
      new ResponsibleRepository() as jest.Mocked<ResponsibleRepository>;
    incrementRepository =
      new IncrementRepository() as jest.Mocked<IncrementRepository>;
    productService = new ProductService();

    (productService as any).productRepository = productRepository;
    (productService as any).responsibleRepository = responsibleRepository;
    (productService as any).incrementRepository = incrementRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        startsAt: new Date(),
        endsAt: new Date(),
      } as Product;

      const createdProduct = {
        ...productData,
        id: 'uuid',
        createdAt: new Date(),
        responsibles: [],
        increments: [],
        toJSON: jest.fn().mockReturnValue({
          ...productData,
          id: 'uuid',
          createdAt: new Date().toISOString(),
          startsAt: productData!.startsAt!.toISOString(),
          endsAt: productData!.endsAt!.toISOString(),
        }),
      } as Product;

      (buildProductEntity as jest.Mock).mockReturnValue(createdProduct);
      productRepository.createProduct.mockResolvedValue(createdProduct);

      const result = await productService.createProduct(productData);

      expect(buildProductEntity).toHaveBeenCalledWith(productData);
      expect(productRepository.createProduct).toHaveBeenCalledWith(
        createdProduct,
      );
      expect(result).toEqual(createdProduct.toJSON());
    });
  });

  describe('getAllProducts', () => {
    it('should return all products with count', async () => {
      const products = [
        {
          id: 'uuid1',
          name: 'Product 1',
          createdAt: new Date(),
          description: 'Description 1',
          startsAt: new Date(),
          endsAt: new Date(),
          responsibles: [],
          increments: [],
          toJSON: jest.fn().mockReturnValue({
            id: 'uuid1',
            name: 'Product 1',
            createdAt: new Date().toISOString(),
            description: 'Description 1',
            startsAt: new Date().toISOString(),
            endsAt: new Date().toISOString(),
          }),
        },
        {
          id: 'uuid2',
          name: 'Product 2',
          createdAt: new Date(),
          description: 'Description 2',
          startsAt: new Date(),
          endsAt: new Date(),
          responsibles: [],
          increments: [],
          toJSON: jest.fn().mockReturnValue({
            id: 'uuid2',
            name: 'Product 2',
            createdAt: new Date().toISOString(),
            description: 'Description 2',
            startsAt: new Date().toISOString(),
            endsAt: new Date().toISOString(),
          }),
        },
      ] as Product[];
      const productsCount = 2;

      productRepository.getAllProducts.mockResolvedValue([
        products,
        productsCount,
      ]);
      incrementRepository.getLatestIncrementId.mockResolvedValue(null);

      const result = await productService.getAllProducts(10, 0, 'asc', 'name');

      expect(productRepository.getAllProducts).toHaveBeenCalledWith(
        10,
        0,
        'asc',
        'name',
      );
      expect(result).toEqual({
        products: products.map((product) => product.toJSON()),
        productsCount,
      });
    });
  });

  describe('getProductById', () => {
    it('should return the product by id', async () => {
      const product = {
        id: 'uuid1',
        name: 'Product 1',
        createdAt: new Date(),
        description: 'Description 1',
        startsAt: new Date(),
        endsAt: new Date(),
        responsibles: [],
        increments: [],
        toJSON: jest.fn().mockReturnValue({
          id: 'uuid1',
          name: 'Product 1',
          createdAt: new Date().toISOString(),
          description: 'Description 1',
          startsAt: new Date().toISOString(),
          endsAt: new Date().toISOString(),
        }),
      } as Product;

      productRepository.getProductById.mockResolvedValue(product);

      const result = await productService.getProductById('uuid1', true);

      expect(productRepository.getProductById).toHaveBeenCalledWith(
        'uuid1',
        true,
      );
      expect(result).toEqual(product.toJSON());
    });

    it('should throw an error if product not found', async () => {
      productRepository.getProductById.mockResolvedValue(null);

      await expect(
        productService.getProductById('uuid1', true),
      ).rejects.toThrow('Product not found');
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const existingProduct = new Product();
      existingProduct.id = 'uuid1';
      existingProduct.name = 'Original Product name';
      existingProduct.createdAt = new Date();
      existingProduct.description = 'Description';
      existingProduct.startsAt = new Date();
      existingProduct.endsAt = new Date();
      existingProduct.responsibles = [];
      existingProduct.increments = [];

      const updatedProductData: Partial<Product> = {
        id: 'uuid1',
        name: 'Updated product name',
        description: 'Updated description',
        startsAt: new Date(),
        endsAt: new Date(),
      };

      const updatedProduct = new Product();
      Object.assign(updatedProduct, existingProduct, updatedProductData);

      productRepository.getProductById.mockResolvedValue(existingProduct);
      productRepository.updateProduct.mockResolvedValue(updatedProduct);

      const result = await productService.updateProduct(
        'uuid1',
        updatedProductData,
      );

      expect(productRepository.updateProduct).toHaveBeenCalledWith(
        'uuid1',
        updatedProductData,
      );
      expect(result).toEqual(updatedProduct);
    });

    it('should update a product with existing responsibles', async () => {
      const existingProduct = new Product();
      existingProduct.id = 'product-uuid1';
      existingProduct.createdAt = new Date();
      existingProduct.responsibles = [
        {
          id: 'responsible-uuid1',
          firstName: 'First name test user 1',
          lastName: 'Last name test user 1',
          role: 'Role test user 1',
          product: existingProduct,
          productId: existingProduct.id,
        },
        {
          id: 'responsible-uuid2',
          firstName: 'First name test user 2',
          lastName: 'Last name test user 2',
          role: 'Role test user 2',
          product: existingProduct,
          productId: existingProduct.id,
        },
      ];

      const newResponsible = {
        id: 'responsible-uuid1',
        firstName: 'First name test user 1',
        lastName: 'Last name test user 1',
        role: null,
        product: existingProduct,
        productId: existingProduct.id,
      };

      const updateProductData: Partial<Product> = {
        id: 'uuid1',
        responsibles: [newResponsible],
      };
      const updatedProduct = new Product();
      Object.assign(updatedProduct, existingProduct, updateProductData);

      productRepository.getProductById.mockResolvedValue(existingProduct);
      productRepository.updateProduct.mockResolvedValue(updatedProduct);
      responsibleRepository.updateResponsible.mockResolvedValue(newResponsible);

      const result = await productService.updateProduct(
        existingProduct.id,
        updateProductData,
      );
      expect(result).toEqual(updatedProduct);
    });

    it('should update a product with a new responsible', async () => {
      const existingProduct = new Product();
      existingProduct.id = 'product-uuid1';
      existingProduct.createdAt = new Date();
      existingProduct.responsibles = [];

      const newResponsible = {
        id: 'responsible-uuid1',
        firstName: 'New first name test user 1',
        lastName: 'New last name test user 1',
        role: 'New role test user 1',
        product: existingProduct,
        productId: existingProduct.id,
      };

      const updateProductData: Partial<Product> = {
        id: 'uuid1',
        responsibles: [newResponsible],
      };
      const updatedProduct = new Product();
      Object.assign(updatedProduct, existingProduct, updateProductData);

      productRepository.getProductById.mockResolvedValue(existingProduct);
      productRepository.updateProduct.mockResolvedValue(updatedProduct);
      responsibleRepository.createResponsible.mockResolvedValue(newResponsible);

      (buildResponsibleEntity as jest.Mock).mockReturnValue(newResponsible);

      const result = await productService.updateProduct(
        existingProduct.id,
        updateProductData,
      );
      expect(result).toEqual(updatedProduct);
    });

    it('should filter out responsibles with no first name and last name', async () => {
      const existingProduct = new Product();
      existingProduct.id = 'product-uuid1';
      existingProduct.createdAt = new Date();
      existingProduct.responsibles = [
        {
          id: 'responsible-uuid1',
          firstName: 'First name test user 1',
          lastName: 'Last name test user 1',
          role: 'Role test user 1',
          product: existingProduct,
          productId: existingProduct.id,
        } as Responsible,
      ];

      const invalidResponsible = {
        id: 'responsible-uuid2',
        firstName: '',
        lastName: '',
        role: 'Role test user 2',
      } as Responsible;

      const validResponsible = {
        id: 'responsible-uuid3',
        firstName: 'First name test user 3',
        lastName: 'Last name test user 3',
        role: 'Role test user 3',
      } as Responsible;

      const updateProductData: Partial<Product> = {
        id: 'uuid1',
        responsibles: [invalidResponsible, validResponsible],
      };
      const updatedProduct = new Product();
      Object.assign(updatedProduct, existingProduct, {
        responsibles: [validResponsible],
      });

      productRepository.getProductById.mockResolvedValue(existingProduct);
      productRepository.updateProduct.mockResolvedValue(updatedProduct);
      responsibleRepository.createResponsible.mockResolvedValue(
        validResponsible,
      );

      (buildResponsibleEntity as jest.Mock).mockImplementation(
        (responsibleData: Responsible) => ({
          ...responsibleData,
          productId: 'product-uuid1',
        }),
      );

      const result = await productService.updateProduct(
        existingProduct.id,
        updateProductData,
      );
      expect(result!.responsibles).toEqual(
        expect.arrayContaining([validResponsible]),
      );
      expect(result!.responsibles).not.toEqual(
        expect.arrayContaining([invalidResponsible]),
      );
    });

    it('should throw an error if product not found', async () => {
      productRepository.getProductById.mockResolvedValue(null);
      productRepository.deleteProduct.mockResolvedValue();

      await expect(productService.updateProduct('uuid1', {})).rejects.toThrow(
        'Product not found',
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete the product', async () => {
      await productService.deleteProduct('uuid1');

      expect(productRepository.deleteProduct).toHaveBeenCalledWith('uuid1');
    });
  });
});
