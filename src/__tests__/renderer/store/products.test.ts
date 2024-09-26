import reducer, {
  initialProductsState,
  setProductsIsCloning,
  setProductsModalOpen,
  setProductsIsEditing,
  setProductsCurrentProduct,
  setProductsCurrentPage,
  setProductsCurrentResponsibles,
  resetProductsCurrentPage,
  setProductsSort,
  setProductsSortby,
  toggleProductsSort,
  setProductsItemsPerPage,
  setProductToDelete,
  setOpenConfirm,
  ProductsState,
} from '../../../renderer/store/products';
import {
  fetchProducts,
  fetchProduct,
  addOrUpdateProduct,
  deleteProduct,
} from '../../../renderer/services/api/products';
import { IProduct } from '../../../renderer/interfaces/IProduct';

describe('productsSlice', () => {
  let initialState: ProductsState;

  beforeEach(() => {
    initialState = { ...initialProductsState };
  });

  it('should handle setProductsIsCloning', () => {
    const state = reducer(initialState, setProductsIsCloning(true));
    expect(state.productsIsCloning).toBe(true);
  });

  it('should handle setProductsModalOpen', () => {
    const state = reducer(initialState, setProductsModalOpen(true));
    expect(state.productsModalOpen).toBe(true);
  });

  it('should handle setProductsIsEditing', () => {
    const state = reducer(initialState, setProductsIsEditing(true));
    expect(state.productsIsEditing).toBe(true);
  });

  it('should handle setProductsCurrentProduct', () => {
    const mockProduct: IProduct = {
      id: '1',
      name: 'Test Product',
      createdAt: '1',
    };
    const state = reducer(initialState, setProductsCurrentProduct(mockProduct));
    expect(state.productsCurrentProduct).toEqual(mockProduct);
  });

  it('should handle setProductsCurrentPage', () => {
    const state = reducer(initialState, setProductsCurrentPage(2));
    expect(state.productsCurrentPage).toBe(2);
  });

  it('should handle resetProductsCurrentPage', () => {
    const state = reducer(initialState, resetProductsCurrentPage());
    expect(state.productsCurrentPage).toBe(1);
  });

  it('should handle setProductsSort', () => {
    const state = reducer(initialState, setProductsSort({ sort: 'asc' }));
    expect(state.productsSort).toBe('asc');
  });

  it('should handle setProductsSortby', () => {
    const state = reducer(initialState, setProductsSortby({ sortby: 'name' }));
    expect(state.productsSortby).toBe('name');
  });

  it('should handle toggleProductsSort', () => {
    const state = reducer(initialState, toggleProductsSort());
    expect(state.productsSort).toBe('asc');
    const newState = reducer(state, toggleProductsSort());
    expect(newState.productsSort).toBe('desc');
  });

  it('should handle setProductsItemsPerPage', () => {
    const state = reducer(initialState, setProductsItemsPerPage(10));
    expect(state.productsItemsPerPage).toBe(10);
  });

  it('should handle setProductToDelete', () => {
    const state = reducer(initialState, setProductToDelete('1'));
    expect(state.productToDelete).toBe('1');
  });

  it('should handle setOpenConfirm', () => {
    const state = reducer(initialState, setOpenConfirm(true));
    expect(state.openConfirm).toBe(true);
  });

  it('should handle setProductsCurrentResponsibles', () => {
    const responsibles = [{ id: '1', name: 'Responsible 1' }];
    const action = {
      type: setProductsCurrentResponsibles.type,
      payload: responsibles,
    };
    const state = reducer(initialState, action);

    expect(state.productsCurrentResponsibles).toEqual(responsibles);
  });

  it('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const state = reducer(initialState, action);
    expect(state.productsIsLoading).toBe(true);
  });

  it('should handle fetchProducts.fulfilled', () => {
    const mockProducts = {
      products: [{ id: '1', name: 'Product 1', createdAt: '1' }],
      productsCount: 1,
    };
    const action = {
      type: fetchProducts.fulfilled.type,
      payload: mockProducts,
    };
    const state = reducer(initialState, action);
    expect(state.products).toEqual(mockProducts);
    expect(state.productsIsLoading).toBe(false);
  });

  it('should handle fetchProducts.rejected', () => {
    const action = {
      type: fetchProducts.rejected.type,
      payload: 'Error fetching products',
    };
    const state = reducer(initialState, action);
    expect(state.productsIsLoading).toBe(false);
    expect(state.productsError).toBe('Error fetching products');
  });

  it('should handle fetchProduct.pending', () => {
    const action = { type: fetchProduct.pending.type };
    const state = reducer(initialState, action);
    expect(state.productIsLoading).toBe(true);
    expect(state.productIsLoaded).toBe(false);
    expect(state.productError).toBeNull();
  });

  it('should handle fetchProduct.fulfilled', () => {
    const mockProduct: IProduct = {
      id: '1',
      name: 'Product 1',
      createdAt: '1',
    };
    const action = { type: fetchProduct.fulfilled.type, payload: mockProduct };
    const state = reducer(initialState, action);
    expect(state.product).toEqual(mockProduct);
    expect(state.productIsLoading).toBe(false);
    expect(state.productIsLoaded).toBe(true);
  });

  it('should handle fetchProduct.rejected', () => {
    const action = {
      type: fetchProduct.rejected.type,
      payload: 'Error fetching product',
    };
    const state = reducer(initialState, action);
    expect(state.productIsLoading).toBe(false);
    expect(state.productIsLoaded).toBe(false);
    expect(state.productError).toBe('Error fetching product');
  });

  it('should handle addOrUpdateProduct.fulfilled with existing product', () => {
    const existingProduct: IProduct = {
      id: '1',
      name: 'Existing Product',
      createdAt: '1',
    };
    const updatedProduct: IProduct = {
      id: '1',
      name: 'Updated Product',
      createdAt: '1',
    };

    const modifiedState = {
      ...initialState,
      products: { ...initialState.products, products: [existingProduct] },
    };
    const action = {
      type: addOrUpdateProduct.fulfilled.type,
      payload: updatedProduct,
    };
    const state = reducer(modifiedState, action);

    expect(state.products.products[0]).toEqual(updatedProduct);
    expect(state.productsModalOpen).toBe(false);
  });

  it('should handle addOrUpdateProduct.fulfilled with new product', () => {
    const newProduct: IProduct = {
      id: '2',
      name: 'New Product',
      createdAt: '2',
    };

    const action = {
      type: addOrUpdateProduct.fulfilled.type,
      payload: newProduct,
    };
    const state = reducer(initialState, action);

    expect(state.products.products[0]).toEqual(newProduct);
    expect(state.productsModalOpen).toBe(false);
  });

  it('should handle addOrUpdateProduct.rejected', () => {
    const action = {
      type: addOrUpdateProduct.rejected.type,
      payload: 'Error adding/updating product',
    };
    const state = reducer(initialState, action);
    expect(state.productsError).toBe('Error adding/updating product');
  });

  it('should handle deleteProduct.fulfilled', () => {
    const existingProducts: IProduct[] = [
      { id: '1', name: 'Product 1', createdAt: '1' },
      { id: '2', name: 'Product 2', createdAt: '2' },
    ];

    const modifiedState = {
      ...initialState,
      products: { ...initialState.products, products: existingProducts },
    };
    const action = { type: deleteProduct.fulfilled.type, payload: '1' };
    const state = reducer(modifiedState, action);

    expect(state.products.products.length).toBe(1);
    expect(state.products.products[0].id).toBe('2');
    expect(state.openConfirm).toBe(false);
  });

  // Test deleteProduct.fulfilled when products array is empty
  it('should handle deleteProduct.fulfilled with empty products array', () => {
    // Simulate a scenario where products.products is an empty array
    const modifiedState = {
      ...initialState,
      products: { ...initialState.products, products: [] },
    };
    const action = { type: deleteProduct.fulfilled.type, payload: '1' };
    const state = reducer(modifiedState, action);

    // Check that the products array remains empty
    expect(state.products.products).toEqual([]);
    expect(state.openConfirm).toBe(false);
  });

  it('should handle deleteProduct.rejected', () => {
    const action = {
      type: deleteProduct.rejected.type,
      payload: 'Error deleting product',
    };
    const state = reducer(initialState, action);

    expect(state.productsError).toBe('Error deleting product');
    expect(state.openConfirm).toBe(false);
  });

  // Test deleteProduct.fulfilled with existing products array
  it('should handle deleteProduct.fulfilled with existing products array', () => {
    const existingProducts: IProduct[] = [
      { id: '1', name: 'Product 1', createdAt: '1' },
      { id: '2', name: 'Product 2', createdAt: '2' },
    ];

    const modifiedState = {
      ...initialState,
      products: { ...initialState.products, products: existingProducts },
    };
    const action = { type: deleteProduct.fulfilled.type, payload: '1' };
    const state = reducer(modifiedState, action);

    expect(state.products.products.length).toBe(1);
    expect(state.products.products[0].id).toBe('2');
    expect(state.openConfirm).toBe(false);
  });
});
