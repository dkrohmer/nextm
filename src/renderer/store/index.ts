import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './products';
import incrementsReducer from './increments';
import modelsReducer from './models';
import versionsReducer from './versions';
import modelEditorReducer from './modelEditor';
import settingsReducer from './settings';

const store = configureStore({
  reducer: {
    products: productsReducer,
    increments: incrementsReducer,
    models: modelsReducer,
    versions: versionsReducer,
    modelEditor: modelEditorReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['settings/showToast', 'settings/hideToast'],
        ignoredPaths: ['settings.toastPromise'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
