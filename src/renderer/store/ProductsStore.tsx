// src/store/ProductStore.tsx
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { IProduct, IProducts } from '../interfaces/IProduct';
import { IResponsible } from '../interfaces/IResponsible';

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
  // states related to product
  product: IProduct | null;
  productIsLoading: boolean;
  productIsLoaded: boolean;
  productError: string | null;
}

const initialProductsState: ProductsState = {
  //products
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
  //product
  product: null,
  productIsLoading: false,
  productIsLoaded: false,
  productError: null,
};

// interfaces
interface AddOrUpdateProductArgs {
  product: IProduct;
  // responsibles: IResponsible[];
}

interface FetchProductsArgs {
  limit: number,
  offset: number,
  sort: string,
  sortby: string,
}

interface FetchProductArgs {
  productId: string,
  isEagerLoading: boolean
}

interface DeleteProductArgs {
  productId: string, 
  limit: number, 
  offset: number,
  sort: string,
  sortby: string,
}

// get all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit, offset, sort, sortby }: FetchProductsArgs, { rejectWithValue }) => {
    try {
      // Construct the URL based on limit and offset
      const params = new URLSearchParams();

      if (limit !== undefined) params.append('limit', String(limit));
      if (offset !== undefined) params.append('offset', String(offset));
      if (sort !== undefined) params.append('sort', String(sort));
      if (sortby !== undefined) params.append('sortby', String(sortby));

      // const response = await axios.get<IProducts>(`/api/products?${params.toString()}`);
      const response = await window.electron.getAllProducts({limit, offset, sort, sortby});

      // return response.data
      return response
    } catch (error) {
      return rejectWithValue('Failed to load products.');
    }
  }
);

// get one product
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async ({productId, isEagerLoading}: FetchProductArgs, { rejectWithValue }) => {
    try {
      // const response = await axios.get<IProduct>(`/api/products/${productId}?eager=${isEagerLoading ? 'true' : 'false'}`);
      // return response.data;
      const response = await window.electron.getProductById({productId, isEagerLoading});
      return response;
    } catch (error) {
      return rejectWithValue('Failed to load product.');
    }
  }
);


// Add or update a product
export const addOrUpdateProduct = createAsyncThunk(
  'products/addOrUpdateProduct',
  async ({ product }: AddOrUpdateProductArgs, { rejectWithValue }) => {
    try {
      // const productData = {
      //   ...product,
      //   responsibles: responsibles.map(({ firstName, lastName, role }) => ({
      //     firstName,
      //     lastName,
      //     role,
      //   })),
      // };

      if (product.id) {
        // const response = await axios.put(`/api/products/${product.id}`, product);
        // return response.data;
        const productId = product.id
        const response = await window.electron.updateProduct({productId, product});
        return response;
      } else {
        // const response = await axios.post('/api/products', product);
        // return response.data;
        const response = await window.electron.createProduct(product);
        console.log("New product")
        console.log(response)
        return response;
      }
    } catch (error) {
      return rejectWithValue('Failed to save product.');
    }
  }
);

// delete a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', 
  async ({productId, limit, offset, sort, sortby}: DeleteProductArgs, { dispatch }) => {
    // await axios.delete(`/api/products/${productId}`);
    await window.electron.deleteProduct({productId})
    dispatch(fetchProducts({limit, offset, sort, sortby}));
    return productId
  }
);

// products slices
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
      // state.productsIsEditing = !!action.payload;
    },
    setProductsCurrentResponsibles(state, action: PayloadAction<IResponsible[] | null>) {
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
      })
      // cases for deleting one product
      // .addCase(deleteProduct.fulfilled, (state, action) => {
      //   state.products = state.products.filter(product => product.id !== action.payload);
      //   state.productsConfirmOpen = false;
      // })
      // .addCase(deleteIncrement.rejected, (state, action) => {
      //   state.productsError = action.payload as string;
      //   state.productsConfirmOpen = false;
      // })
      ;
  }
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
  setProductsItemsPerPage
} = productsSlice.actions;

export default productsSlice.reducer;
