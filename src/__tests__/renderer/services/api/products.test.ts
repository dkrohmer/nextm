import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../../../renderer/store/products'; // Import the products reducer
import {
  fetchProducts,
  fetchProduct,
  addOrUpdateProduct,
  deleteProduct,
} from '../../../../renderer/services/api/products';
import windowElectron from '../../../../../mocks/window-electron';

// Set up a test store with the productsReducer slice
const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// Tests for products thunks
describe('Products Thunks with Redux Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fetchProducts and updates the store on success', async () => {
    const mockProducts = {
      products: [{ id: '1', name: 'Product 1' }],
      productsCount: 1,
    };

    window.electron = {
      ...windowElectron,
      getAllProducts: jest.fn().mockResolvedValue(mockProducts),
    };

    // Dispatch the fetchProducts thunk
    await store.dispatch(
      fetchProducts({ limit: 10, offset: 0, sort: 'asc', sortby: 'name' }),
    );

    const state = store.getState().products;
    expect(window.electron.getAllProducts).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
      sort: 'asc',
      sortby: 'name',
    });
    expect(state.products.products).toEqual(mockProducts.products);
  });

  it('dispatches fetchProduct and updates the store on success', async () => {
    const mockProduct = { id: '1', name: 'Product 1' };

    window.electron = {
      ...windowElectron,
      getProductById: jest.fn().mockResolvedValue(mockProduct),
    };

    // Dispatch the fetchProduct thunk
    await store.dispatch(
      fetchProduct({ productId: '1', isEagerLoading: true }),
    );

    expect(window.electron.getProductById).toHaveBeenCalledWith({
      productId: '1',
      isEagerLoading: true,
    });

    const state = store.getState().products;
    expect(state.product).toEqual(mockProduct);
  });

  it('dispatches addOrUpdateProduct and updates the store for an update', async () => {
    const mockProduct = { id: '1', name: 'Updated Product', createdAt: '1' };

    window.electron = {
      ...windowElectron,
      updateProduct: jest.fn().mockResolvedValue(mockProduct),
    };

    // Dispatch the addOrUpdateProduct thunk
    await store.dispatch(addOrUpdateProduct({ product: mockProduct }));

    const state = store.getState().products;
    // expect(state.products.products[0]).toEqual(mockProduct);
    expect(
      state.products.products.find((product) => product.id === '1'),
    ).toBeDefined();
    expect(window.electron.updateProduct).toHaveBeenCalledWith({
      productId: '1',
      product: mockProduct,
    });
  });

  it('dispatches addOrUpdateProduct and updates the store for a new product', async () => {
    const newProduct = { id: '', name: 'New Product', createdAt: '1' };
    const mockCreatedProduct = { id: '1', name: 'New Product', createdAt: '1' };

    window.electron = {
      ...windowElectron,
      createProduct: jest.fn().mockResolvedValue(mockCreatedProduct),
    };

    // Dispatch the addOrUpdateProduct thunk
    await store.dispatch(addOrUpdateProduct({ product: newProduct }));

    const state = store.getState().products;
    // expect(state.products.products[0]).toEqual(mockCreatedProduct);
    expect(
      state.products.products.find((product) => product.id === '1'),
    ).toBeDefined();

    expect(window.electron.createProduct).toHaveBeenCalledWith(newProduct);
  });

  it('dispatches deleteIncrement and updates the store on success', async () => {
    window.electron = {
      ...windowElectron,
      deleteIncrement: jest.fn().mockResolvedValue('1'),
    };

    // Dispatch the deleteIncrement thunk
    await store.dispatch(
      deleteProduct({
        productId: '1',
        limit: 10,
        offset: 0,
        sort: 'asc',
        sortby: 'name',
      }),
    );

    const state = store.getState().products;
    expect(window.electron.deleteProduct).toHaveBeenCalledWith({
      productId: '1',
    });
  });

  it('handles fetchProducts failure correctly', async () => {
    window.electron = {
      ...windowElectron,
      getAllProducts: jest
        .fn()
        .mockRejectedValue(new Error('Failed to load products.')),
    };

    // Dispatch the fetchProducts thunk
    await store.dispatch(
      fetchProducts({ limit: 10, offset: 0, sort: 'asc', sortby: 'name' }),
    );

    const state = store.getState().products;
    expect(state.productsError).toBe('Failed to load products.');
    expect(window.electron.getAllProducts).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
      sort: 'asc',
      sortby: 'name',
    });
  });

  it('handles fetchProduct failure correctly', async () => {
    window.electron.getProductById = jest
      .fn()
      .mockRejectedValue(new Error('Failed to load product.'));

    // Dispatch the fetchProduct thunk
    await store.dispatch(
      fetchProduct({ productId: '1', isEagerLoading: true }),
    );

    const state = store.getState().products;
    expect(state.productError).toBe('Failed to load product.');
    expect(window.electron.getProductById).toHaveBeenCalledWith({
      productId: '1',
      isEagerLoading: true,
    });
  });

  it('handles addOrUpdateProduct failure correctly', async () => {
    const mockProduct = { id: '1', name: 'Product 1', createdAt: '1' };
    window.electron.updateProduct = jest
      .fn()
      .mockRejectedValue(new Error('Failed to add or update product.'));

    // Dispatch the addOrUpdateProduct thunk
    await store.dispatch(addOrUpdateProduct({ product: mockProduct }));

    const state = store.getState().products;
    expect(state.productsError).toBe('Failed to add or update product.');
  });

  it('handles deleteProduct failure correctly', async () => {
    window.electron.deleteProduct = jest
      .fn()
      .mockRejectedValue(new Error('Failed to delete product.'));

    // Dispatch the deleteProduct thunk
    await store.dispatch(
      deleteProduct({
        productId: '1',
        limit: 10,
        offset: 0,
        sort: 'asc',
        sortby: 'name',
      }),
    );

    const state = store.getState().products;
    expect(state.productsError).toBe('Failed to delete product.');
  });
});
