// src/store/ProductStore.tsx
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  // General settings
  sidebarVisible: boolean;
  toastVisible: boolean;
  toastPromise: Promise<any> | null;
  toastLoadingMessage: string;
  toastSuccessMessage: string;
  toastErrorMessage: string;
  path: string;
  pathIsLoading: boolean;
  pathIsLoaded: boolean;
  pathError: string | null;
  // Model Editor settings
  gridVisible: 'none' | 'dot' | 'mesh';
  explicitObjectSelection: boolean;
}

const initialSettingsState: SettingsState = {
  // General settings
  sidebarVisible: false,
  toastVisible: false,
  toastPromise: null,
  toastLoadingMessage: '',
  toastSuccessMessage: '',
  toastErrorMessage: '',
  path: '',
  pathIsLoading: false,
  pathIsLoaded: false,
  pathError: null,
  // Model Editor settings
  gridVisible: 'none',
  explicitObjectSelection: false
};

// products slices
const productsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {
    // General settings
    setSidebarVisible(state, action: PayloadAction<boolean>) {
      state.sidebarVisible = action.payload;
    },
    showToast: (state, action: PayloadAction<{ promise: Promise<any>; loadingMessage: string; successMessage: string; errorMessage: string }>) => {
      state.toastVisible = true;
      state.toastPromise = action.payload.promise;
      state.toastLoadingMessage = action.payload.loadingMessage;
      state.toastSuccessMessage = action.payload.successMessage;
      state.toastErrorMessage = action.payload.errorMessage;
    },
    hideToast: (state) => {
      state.toastVisible = false;
      state.toastPromise = null;
      state.toastLoadingMessage = '';
      state.toastSuccessMessage = '';
      state.toastErrorMessage = '';
    },
    // Model Editor settings
    setGridVisible(state, action: PayloadAction<'none' | 'dot' | 'mesh'>) {
      state.gridVisible = action.payload;
    },
    setDatabasePath(state, action: PayloadAction<string>) {
      state.path = action.payload;
    },
    setExplicitObjectSelection(state, action: PayloadAction<boolean>) {
      state.explicitObjectSelection = action.payload;
    },
  },
});

export const { 
  setSidebarVisible,
  showToast,
  hideToast,
  setGridVisible,
  setDatabasePath,
  setExplicitObjectSelection
} = productsSlice.actions;

export default productsSlice.reducer;
