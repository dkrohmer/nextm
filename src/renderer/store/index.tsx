// store/index.ts
import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './ProductsStore';
import incrementsReducer from './IncrementsStore';
import modelsReducer from './ModelsStore';
import versionsReducer from './VersionsStore'
import modelEditorReducer from './ModelEditorStore';
import settingsReducer from './SettingsStore';

const store = configureStore({
  reducer: {
    products: productsReducer,
    increments: incrementsReducer,
    models: modelsReducer,
    versions: versionsReducer,
    modelEditor: modelEditorReducer,
    settings: settingsReducer
  },
  // ignore non-serializable data for toasts...
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
