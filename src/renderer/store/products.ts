import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IProduct } from '../interfaces/IProduct';
import { IResponsible } from '../interfaces/IResponsible';
import { fetchProducts, fetchProduct } from '../services/api/products';

interface ProductsState {
  // states related to products
  products: IProduct[];
  productsCount: number;
  productsIsLoading: boolean;
  productsError: string | null;
  productsIsCloning: boolean;
  productsModalOpen: boolean;
  productsCurrentProduct: IProduct | null;
  productsCurrentResponsibles: IResponsible[] | null;
  productsIsEditing: boolean;
  productsCurrentPage: number;
  productsSortby: string;
  productsSort: string;
  productsItemsPerPage: number;
  openConfirm: boolean;
  productToDelete: string | null;
  // states related to product
  product: IProduct | null;
  productIsLoading: boolean;
  productIsLoaded: boolean;
  productError: string | null;
}

const initialProductsState: ProductsState = {
  // products
  products: [],
  productsCount: 0,
  productsIsLoading: false,
  productsError: null,
  productsIsCloning: false,
  productsModalOpen: false,
  productsCurrentProduct: null,
  productsCurrentResponsibles: null,
  productsIsEditing: false,
  productsCurrentPage: 1,
  productsSortby: 'createdAt',
  productsSort: 'desc',
  productsItemsPerPage: 5,
  openConfirm: false,
  productToDelete: null,
  // product
  product: null,
  productIsLoading: false,
  productIsLoaded: false,
  productError: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    setProductsIsCloning(state, action: PayloadAction<boolean>) {
      state.productsIsCloning = action.payload;
    },
    setProductsModalOpen(state, action: PayloadAction<boolean>) {
      state.productsModalOpen = action.payload;
    },
    setProductsIsEditing(state, action: PayloadAction<boolean>) {
      state.productsIsEditing = action.payload;
    },
    setProductsCurrentProduct(state, action: PayloadAction<IProduct | null>) {
      state.productsCurrentProduct = action.payload;
    },
    setProductsCurrentResponsibles(
      state,
      action: PayloadAction<IResponsible[] | null>,
    ) {
      state.productsCurrentResponsibles = action.payload;
    },
    setProductsCurrentPage: (state, action: PayloadAction<number>) => {
      state.productsCurrentPage = action.payload;
    },
    resetProductsCurrentPage: (state) => {
      state.productsCurrentPage = 1;
    },
    setProductsSort: (state, action: PayloadAction<{ sort: string }>) => {
      state.productsSort = action.payload.sort;
    },
    setProductsSortby: (state, action: PayloadAction<{ sortby: string }>) => {
      state.productsSortby = action.payload.sortby;
    },
    toggleProductsSort: (state) => {
      state.productsSort = state.productsSort === 'asc' ? 'desc' : 'asc';
    },
    setProductsItemsPerPage: (state, action: PayloadAction<number>) => {
      state.productsItemsPerPage = action.payload;
    },
    setProductToDelete: (state, action: PayloadAction<string | null>) => {
      state.productToDelete = action.payload;
    },
    setOpenConfirm: (state, action: PayloadAction<boolean>) => {
      state.openConfirm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // cases for fetching ALL products
      .addCase(fetchProducts.pending, (state) => {
        state.productsIsLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.productsIsLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsIsLoading = false;
        state.productsError = action.payload as string;
      })
      // cases for fetching ONE product
      .addCase(fetchProduct.pending, (state) => {
        state.productIsLoaded = false;
        state.productIsLoading = true;
        state.productError = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.productIsLoading = false;
        state.productIsLoaded = true;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.productIsLoaded = false;
        state.productIsLoading = false;
        state.productError = action.payload as string;
      });
  },
});

export const {
  setProductsIsCloning,
  setProductsModalOpen,
  setProductsIsEditing,
  setProductsCurrentProduct,
  setProductsCurrentPage,
  resetProductsCurrentPage,
  setProductsSort,
  setProductsSortby,
  toggleProductsSort,
  setProductsItemsPerPage,
  setProductToDelete,
  setOpenConfirm,
} = productsSlice.actions;

export default productsSlice.reducer;
