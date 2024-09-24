import { DataSource } from 'typeorm';
import { Product } from '../../../main/models/Product';
import { initializeDataSource, getDataSource } from '../../../main/database';
import { ProductRepository } from '../../../main/repositories/ProductRepository';

let dataSource: DataSource;
let productRepository: ProductRepository;

beforeAll(async () => {
  await initializeDataSource(':memory:');
  dataSource = getDataSource();
  productRepository = new ProductRepository();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe('ProductRepository', () => {
  it('should create a new product', async () => {
    const product = new Product();
    product.name = 'Test Product';
    product.description = 'Test Description';
    product.startsAt = new Date();
    product.endsAt = new Date();

    const savedProduct = await productRepository.createProduct(product);

    expect(savedProduct).toHaveProperty('id');
    expect(savedProduct.name).toBe('Test Product');
  });

  it('should get all products with limit and offset', async () => {
    const [products, count] = await productRepository.getAllProducts(10, 0, 'asc', 'name');

    expect(Array.isArray(products)).toBe(true);
    expect(typeof count).toBe('number');
  });

  it('should get a product by id', async () => {
    const product = new Product();
    product.name = 'Test Product';
    const savedProduct = await productRepository.createProduct(product);

    const foundProduct = await productRepository.getProductById(savedProduct.id, false);
    expect(foundProduct).toBeDefined();
    expect(foundProduct!.id).toBe(savedProduct.id);
  });

  it('should return null when getting a non-existent product by id', async () => {
    const foundProduct = await productRepository.getProductById('non-existent-id', false);
    expect(foundProduct).toBeNull();
  });

  it('should return null when getting a product without submitting an id', async () => {
    const foundProduct = await productRepository.getProductById('', false);
    expect(foundProduct).toBeNull();
  });

  it('should get a product by id with eager flag', async () => {
    const product = new Product();
    product.name = 'Eager Test Product';
    const savedProduct = await productRepository.createProduct(product);

    const foundProduct = await productRepository.getProductById(savedProduct.id, true);
    expect(foundProduct).toBeDefined();
    expect(foundProduct!.id).toBe(savedProduct.id);
    expect(foundProduct!.responsibles).toBeDefined(); // Ensure eager relations are loaded
  });

  it('should update a product', async () => {
    const product = new Product();
    product.name = 'Original Name';
    const savedProduct = await productRepository.createProduct(product);

    savedProduct.name = 'Updated Name';
    const updatedProduct = await productRepository.updateProduct(savedProduct.id, savedProduct);

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct!.name).toBe('Updated Name');
  });

  it('should return null when updating a non-existent product', async () => {
    const updatedProduct = await productRepository.updateProduct('non-existent-id', { name: 'Updated Name' });
    expect(updatedProduct).toBeNull();
  });

  it('should delete a product', async () => {
    const product = new Product();
    product.name = 'Test Product';
    const savedProduct = await productRepository.createProduct(product);

    await productRepository.deleteProduct(savedProduct.id);
    const deletedProduct = await productRepository.getProductById(savedProduct.id, false);

    expect(deletedProduct).toBeNull();
  });

  it('should not throw an error when deleting a non-existent product', async () => {
    await expect(productRepository.deleteProduct('non-existent-id')).resolves.not.toThrow();
  });

  // Test failed validation during creation
  it('should throw an error when creating a product with invalid data', async () => {
    const invalidProduct = new Product();
    invalidProduct.name = ''; // Invalid: name is empty
    invalidProduct.description = 'Valid description'; // Valid description
    invalidProduct.startsAt = new Date();
    invalidProduct.endsAt = new Date();
    invalidProduct.latestIncrementId = 'invalid-uuid'; // Invalid: latestIncrementId is not a valid UUID

    await expect(productRepository.createProduct(invalidProduct))
      .rejects
      .toThrow('Validation failed');
  });

  it('should throw an error when updating a product with invalid data', async () => {
    const product = new Product();
    product.name = 'Valid Name';
    product.description = 'Valid description';
    product.startsAt = new Date();
    product.endsAt = new Date();
    const savedProduct = await productRepository.createProduct(product);

    // Try updating with invalid data
    const updatedProduct = {
      ...savedProduct,
      name: '', // Invalid: name is empty
      latestIncrementId: 'invalid-uuid', // Invalid: not a valid UUID
    };

    // Expect the update operation to fail due to validation
    await expect(productRepository.updateProduct(savedProduct.id, updatedProduct))
      .rejects
      .toThrow('Validation failed');
  });
});
