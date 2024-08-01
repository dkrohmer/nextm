import { createSlice } from '@reduxjs/toolkit';
import type { IIncrement } from '../interfaces/IIncrement';
import { fetchIncrements, fetchIncrement, addOrUpdateIncrement, deleteIncrement } from '../services/api/increments';

interface IncrementsState {
  increments: IIncrement[];
  incrementsIsLoading: boolean;
  incrementsIsLoaded: boolean;
  incrementsActiveIndex: number | undefined;
  incrementsActiveIncrementId: string | null;
  incrementsModalOpen: boolean;
  incrementsIsEditing: boolean;
  incrementsIsCloning: boolean;
  incrementsError: string | null;
  incrementsConfirmOpen: boolean;
  currentIncrement: IIncrement | null;
  incrementToDelete: string | null;
  increment: IIncrement | null;
  incrementIsLoading: boolean;
  incrementIsLoaded: boolean;
  incrementError: string | null;
}

const initialState: IncrementsState = {
  increments: [],
  incrementsIsLoading: false,
  incrementsIsLoaded: false,
  incrementsActiveIndex: undefined,
  incrementsActiveIncrementId: null,
  incrementsModalOpen: false,
  incrementsIsEditing: false,
  incrementsIsCloning: false,
  incrementsError: null,
  incrementsConfirmOpen: false,
  currentIncrement: null,
  incrementToDelete: null,
  increment: null,
  incrementIsLoading: false,
  incrementIsLoaded: false,
  incrementError: null,
};

const incrementsSlice = createSlice({
  name: 'increments',
  initialState,
  reducers: {
    setIncrementsActiveIndex(state, action) {
      state.incrementsActiveIndex = action.payload;
    },
    setIncrementsActiveIncrementId(state, action) {
      state.incrementsActiveIncrementId = action.payload;
    },
    setIncrementsModalOpen(state, action) {
      state.incrementsModalOpen = action.payload;
    },
    setIncrementsIsEditing(state, action) {
      state.incrementsIsEditing = action.payload;
    },
    setIncrementsIsCloning(state, action) {
      state.incrementsIsCloning = action.payload;
    },
    setIncrementsConfirmOpen(state, action) {
      state.incrementsConfirmOpen = action.payload;
    },
    setCurrentIncrement(state, action) {
      state.currentIncrement = action.payload;
    },
    setIncrementToDelete(state, action) {
      state.incrementToDelete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // cases for fetching all increments
      .addCase(fetchIncrements.pending, (state) => {
        state.incrementsIsLoading = true;
        state.incrementsIsLoaded = false;
      })
      .addCase(fetchIncrements.fulfilled, (state, action) => {
        state.increments = action.payload.increments;
        state.incrementsIsLoading = false;
        state.incrementsIsLoaded = true;
      })
      .addCase(fetchIncrements.rejected, (state, action) => {
        state.incrementsIsLoading = false;
        state.incrementsIsLoaded = false;
        state.incrementsError =
          action.error.message || 'Failed to load increments';
      })
      // cases for fetching one increment
      .addCase(fetchIncrement.pending, (state) => {
        state.incrementIsLoading = true;
        state.incrementError = null;
        state.incrementIsLoaded = false;
      })
      .addCase(fetchIncrement.fulfilled, (state, action) => {
        state.increment = action.payload;
        state.incrementIsLoading = false;
        state.incrementIsLoaded = true;
      })
      .addCase(fetchIncrement.rejected, (state, action) => {
        state.incrementIsLoading = false;
        state.incrementIsLoaded = false;
        state.incrementError = action.payload as string;
      })
      // cases for adding or updating one increment
      .addCase(addOrUpdateIncrement.fulfilled, (state, action) => {
        const index = state.increments.findIndex(
          (inc) => inc.id === action.payload.id,
        );
        if (index !== -1) {
          state.increments[index] = action.payload;
        } else {
          state.increments.unshift(action.payload);
        }
        state.incrementsModalOpen = false; // Close modal on success
      })
      // cases for deleting one increment
      .addCase(deleteIncrement.fulfilled, (state, action) => {
        state.increments = state.increments.filter(
          (increment) => increment.id !== action.payload,
        );
        state.incrementsConfirmOpen = false;
      })
      .addCase(deleteIncrement.rejected, (state, action) => {
        state.incrementsError = action.payload as string;
        state.incrementsConfirmOpen = false;
      });
  },
});

export const {
  setIncrementsActiveIndex,
  setIncrementsActiveIncrementId,
  setIncrementsModalOpen,
  setIncrementsIsEditing,
  setIncrementsIsCloning,
  setCurrentIncrement,
  setIncrementsConfirmOpen,
  setIncrementToDelete,
} = incrementsSlice.actions;

export default incrementsSlice.reducer;