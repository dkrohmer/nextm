import { ipcMain, ipcRenderer } from 'electron';
import { ProductService } from '../../../main/services/ProductService';
import { ProductController } from '../../../main/controllers/ProductController';
import { Product } from '../../../main/models/Product';

jest.mock('../../../main/services/ProductService');

describe('ProductController', () => {
  let productController: ProductController;
  let productService: jest.Mocked<ProductService>;

  beforeEach(() => {
    productController = new ProductController();
    productService = new ProductService() as jest.Mocked<ProductService>;
    productController['productService'] = productService;
  });

  afterEach(() => {
    jest.clearAllMocks();
    productController.destroy();
    ipcMain.removeHandler('create-product');
    ipcMain.removeHandler('get-all-products');
    ipcMain.removeHandler('get-product-by-id');
    ipcMain.removeHandler('update-product');
    ipcMain.removeHandler('delete-product');
  });

  it('should handle get-all-products correctly', async () => {
    const mockProduct = new Product();
    mockProduct.id = '123';
    mockProduct.createdAt = new Date();
    mockProduct.name = 'test-product';
    mockProduct.toJSON = jest.fn().mockReturnValue({
      ...mockProduct,
      createdAt: mockProduct.createdAt.toISOString(),
    });

    productService.getAllProducts.mockResolvedValue({
      products: [mockProduct],
      productsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-products', {
      limit: 10,
      offset: 0,
      sort: 'asc',
      sortby: 'createdAt',
    });

    expect(response).toEqual({ products: [mockProduct], productsCount: 1 });
    expect(productService.getAllProducts).toHaveBeenCalledWith(10, 0, 'asc', 'createdAt');
  });

  it('should handle get-all-products with invalid sort direction', async () => {
    const mockProduct = new Product();
    mockProduct.id = '123';
    mockProduct.createdAt = new Date();
    mockProduct.name = 'test-product';
    mockProduct.toJSON = jest.fn().mockReturnValue({
      ...mockProduct,
      createdAt: mockProduct.createdAt.toISOString(),
    });

    productService.getAllProducts.mockResolvedValue({
      products: [mockProduct],
      productsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-products', {
      limit: 10,
      offset: 0,
      sort: 'invalid',
      sortby: 'createdAt',
    });

    expect(response).toEqual({ products: [mockProduct], productsCount: 1 });
    expect(productService.getAllProducts).toHaveBeenCalledWith(10, 0, 'desc', 'createdAt');
  });

  it('should handle get-all-products with invalid sortby', async () => {
    const mockProduct = new Product();
    mockProduct.id = '123';
    mockProduct.createdAt = new Date();
    mockProduct.name = 'test-product';
    mockProduct.toJSON = jest.fn().mockReturnValue({
      ...mockProduct,
      createdAt: mockProduct.createdAt.toISOString(),
    });

    productService.getAllProducts.mockResolvedValue({
      products: [mockProduct],
      productsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-products', {
      limit: 10,
      offset: 0,
      sort: 'asc',
      sortby: 'invalid-field',
    });

    expect(response).toEqual({ products: [mockProduct], productsCount: 1 });
    expect(productService.getAllProducts).toHaveBeenCalledWith(10, 0, 'asc', 'createdAt');
  });

  it('should handle get-all-products with missing sortby', async () => {
    const mockProduct = new Product();
    mockProduct.id = '123';
    mockProduct.createdAt = new Date();
    mockProduct.name = 'test-product';
    mockProduct.toJSON = jest.fn().mockReturnValue({
      ...mockProduct,
      createdAt: mockProduct.createdAt.toISOString(),
    });

    productService.getAllProducts.mockResolvedValue({
      products: [mockProduct],
      productsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-products', {
      limit: 10,
      offset: 0,
      sort: 'asc',
    });

    expect(response).toEqual({ products: [mockProduct], productsCount: 1 });
    expect(productService.getAllProducts).toHaveBeenCalledWith(10, 0, 'asc', 'createdAt');
  });

  it('should handle get-all-products with default limit', async () => {
    const mockProduct = new Product();
    mockProduct.id = '123';
    mockProduct.createdAt = new Date();
    mockProduct.name = 'test-product';
    mockProduct.toJSON = jest.fn().mockReturnValue({
      ...mockProduct,
      createdAt: mockProduct.createdAt.toISOString(),
    });

    productService.getAllProducts.mockResolvedValue({
      products: [mockProduct],
      productsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-products', {
      offset: 0,
      sort: 'asc',
      sortby: 'createdAt',
    });

    expect(response).toEqual({ products: [mockProduct], productsCount: 1 });
    expect(productService.getAllProducts).toHaveBeenCalledWith(10, 0, 'asc', 'createdAt');
  });

  it('should handle get-all-products error', async () => {
    const error = new Error('Fetch error');
    productService.getAllProducts.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('get-all-products', {
      limit: 10,
      offset: 0,
      sort: 'asc',
      sortby: 'createdAt',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle get-product-by-id correctly', async () => {
    const mockProduct = new Product();
    mockProduct.id = '123';
    mockProduct.createdAt = new Date();
    mockProduct.name = 'test-product';
    mockProduct.toJSON = jest.fn().mockReturnValue({
      ...mockProduct,
      createdAt: mockProduct.createdAt.toISOString(),
    });

    productService.getProductById.mockResolvedValue(mockProduct);

    const response = await ipcRenderer.invoke('get-product-by-id', {
      productId: '123',
      isEagerLoading: true,
    });

    expect(response).toEqual(mockProduct);
    expect(productService.getProductById).toHaveBeenCalledWith('123', true);
  });

  it('should handle get-product-by-id error', async () => {
    const error = new Error('Fetch error');
    productService.getProductById.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('get-product-by-id', {
      productId: '123',
      isEagerLoading: true,
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle get-product-by-id nulled', async () => {
    const error = new Error('Failed to get product');
    productService.getProductById.mockResolvedValue(null);

    const response = await ipcRenderer.invoke('get-product-by-id', {
      productId: '123',
      isEagerLoading: true,
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle create-product correctly', async () => {
    const mockProduct = new Product();
    mockProduct.id = '123';
    mockProduct.createdAt = new Date();
    mockProduct.name = 'test-product';
    mockProduct.toJSON = jest.fn().mockReturnValue({
      ...mockProduct,
      createdAt: mockProduct.createdAt.toISOString(),
    });

    productService.createProduct.mockResolvedValue(mockProduct);

    const response = await ipcRenderer.invoke('create-product', {
      name: 'test-product',
      description: 'test description',
      startsAt: new Date(),
      endsAt: new Date(),
    });

    expect(response).toEqual(mockProduct);
    expect(productService.createProduct).toHaveBeenCalledWith({
      name: 'test-product',
      description: 'test description',
      startsAt: expect.any(Date),
      endsAt: expect.any(Date),
    });
  });

  it('should handle create-product error', async () => {
    const error = new Error('Create error');
    productService.createProduct.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('create-product', {
      name: 'test-product',
      description: 'test description',
      startsAt: new Date(),
      endsAt: new Date(),
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle update-product correctly', async () => {
    const mockProduct = new Product();
    mockProduct.id = '123';
    mockProduct.createdAt = new Date();
    mockProduct.name = 'updated-product';
    mockProduct.toJSON = jest.fn().mockReturnValue({
      ...mockProduct,
      createdAt: mockProduct.createdAt.toISOString(),
    });

    productService.updateProduct.mockResolvedValue(mockProduct);

    const response = await ipcRenderer.invoke('update-product', {
      productId: '123',
      product: {
        name: 'updated-product',
        description: 'updated description',
        startsAt: new Date(),
        endsAt: new Date(),
      },
    });

    expect(response).toEqual(mockProduct);
    expect(productService.updateProduct).toHaveBeenCalledWith('123', {
      name: 'updated-product',
      description: 'updated description',
      startsAt: expect.any(Date),
      endsAt: expect.any(Date),
    });
  });

  it('should handle update-product error', async () => {
    const error = new Error('Update error');
    productService.updateProduct.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('update-product', {
      productId: '123',
      product: {
        name: 'updated-product',
        description: 'updated description',
        startsAt: new Date(),
        endsAt: new Date(),
      },
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle update-product nulled', async () => {
    const error = new Error('Failed to update product');
    productService.updateProduct.mockResolvedValue(null);

    const response = await ipcRenderer.invoke('update-product', {
      productId: '123',
      product: {
        name: 'updated-product',
        description: 'updated description',
        startsAt: new Date(),
        endsAt: new Date(),
      },
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle delete-product correctly', async () => {
    const response = await ipcRenderer.invoke('delete-product', {
      productId: '123',
    });

    expect(response).toBeUndefined();
    expect(productService.deleteProduct).toHaveBeenCalledWith('123');
  });

  it('should handle delete-product error', async () => {
    const error = new Error('Delete error');
    productService.deleteProduct.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('delete-product', {
      productId: '123',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });
});
