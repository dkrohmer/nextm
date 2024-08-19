import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IProduct } from '../../interfaces/IProduct';

interface AddOrUpdateProductArgs {
  product: IProduct;
}

interface FetchProductsArgs {
  limit: number;
  offset: number;
  sort: string;
  sortby: string;
}

interface FetchProductArgs {
  productId: string;
  isEagerLoading: boolean;
}

interface DeleteProductArgs {
  productId: string;
  limit: number;
  offset: number;
  sort: string;
  sortby: string;
}

/**
 * get all products
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    { limit, offset, sort, sortby }: FetchProductsArgs,
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams();

      if (limit !== undefined) params.append('limit', String(limit));
      if (offset !== undefined) params.append('offset', String(offset));
      if (sort !== undefined) params.append('sort', String(sort));
      if (sortby !== undefined) params.append('sortby', String(sortby));

      // const response = await axios.get<IProducts>(`/api/products?${params.toString()}`);
      const response = await window.electron.getAllProducts({
        limit,
        offset,
        sort,
        sortby,
      });

      // return response.data
      return response;
    } catch (error) {
      return rejectWithValue('Failed to load products.');
    }
  },
);

/**
 * get one product
 */
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (
    { productId, isEagerLoading }: FetchProductArgs,
    { rejectWithValue },
  ) => {
    try {
      // const response = await axios.get<IProduct>(`/api/products/${productId}?eager=${isEagerLoading ? 'true' : 'false'}`);
      // return response.data;
      const response = await window.electron.getProductById({
        productId,
        isEagerLoading,
      });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to load product.');
    }
  },
);

/**
 * add or update a product
 */
export const addOrUpdateProduct = createAsyncThunk(
  'products/addOrUpdateProduct',
  async ({ product }: AddOrUpdateProductArgs, { rejectWithValue }) => {
    try {
      if (product.id) {
        // const response = await axios.put(`/api/products/${product.id}`, product);
        // return response.data;
        const productId = product.id;
        const response = await window.electron.updateProduct({
          productId,
          product,
        });
        return response;
      }
      // const response = await axios.post('/api/products', product);
      // return response.data;
      const response = await window.electron.createProduct(product);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to save product.');
    }
  },
);

/**
 * detele a product
 */
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (
    { productId, limit, offset, sort, sortby }: DeleteProductArgs,
    { dispatch },
  ) => {
    // await axios.delete(`/api/products/${productId}`);
    await window.electron.deleteProduct({ productId });
    dispatch(fetchProducts({ limit, offset, sort, sortby }));
    return productId;
  },
);
