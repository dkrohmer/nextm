import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IIncrement } from '../../interfaces/IIncrement';

interface FetchIncrementsArgs {
  productId: string;
}

interface FetchIncrementArgs {
  incrementId: string;
  isEagerLoading: boolean;
}

/**
 * get all increments
 */
export const fetchIncrements = createAsyncThunk(
  'increments/fetchIncrements',
  async ({ productId }: FetchIncrementsArgs, { rejectWithValue }) => {
    try {
      const response = await window.electron.getAllIncrements({
        productId,
        sortby: 'incrementIndex',
        sort: 'desc',
      });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to load increments.');
    }
  },
);

/**
 * get one increment
 */
export const fetchIncrement = createAsyncThunk(
  'increments/fetchIncrement',
  async (
    { incrementId, isEagerLoading }: FetchIncrementArgs,
    { rejectWithValue },
  ) => {
    try {
      const response = await window.electron.getIncrementById({
        incrementId,
        isEagerLoading,
      });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to load increment.');
    }
  },
);

/**
 * add or update an increment
 */
export const addOrUpdateIncrement = createAsyncThunk<
  IIncrement,
  { increment: IIncrement; productId: string }
>(
  'increments/addOrUpdateIncrement',
  async (
    { increment, productId }: { increment: IIncrement; productId: string },
    { rejectWithValue },
  ) => {
    try {
      if (increment.id) {
        const incrementId = increment.id;
        const response = await window.electron.updateIncrement({
          ...increment,
          incrementId,
          productId,
        });
        return response;
      }
      const response = await window.electron.createIncrement({
        ...increment,
        productId,
      });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to add or update increment.');
    }
  },
);

/**
 * delete an increment
 */
export const deleteIncrement = createAsyncThunk(
  'increments/deleteIncrement',
  async (incrementId: string, { rejectWithValue }) => {
    try {
      await window.electron.deleteIncrement({ incrementId });
      return incrementId;
    } catch (error) {
      return rejectWithValue('Failed to delete increment.');
    }
  },
);
