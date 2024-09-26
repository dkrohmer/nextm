import store from '../../../renderer/store'; // Adjust the path if necessary
import productsReducer from '../../../renderer/store/products';
import incrementsReducer from '../../../renderer/store/increments';
import modelsReducer from '../../../renderer/store/models';
import versionsReducer from '../../../renderer/store/versions';
import modelEditorReducer from '../../../renderer/store/modelEditor';
import settingsReducer from '../../../renderer/store/settings';

describe('Redux Store', () => {
  it('should initialize the store with the correct reducers', () => {
    const state = store.getState();

    expect(state.products).toEqual(
      productsReducer(undefined, { type: '@@INIT' }),
    );
    expect(state.increments).toEqual(
      incrementsReducer(undefined, { type: '@@INIT' }),
    );
    expect(state.models).toEqual(modelsReducer(undefined, { type: '@@INIT' }));
    expect(state.versions).toEqual(
      versionsReducer(undefined, { type: '@@INIT' }),
    );
    expect(state.modelEditor).toEqual(
      modelEditorReducer(undefined, { type: '@@INIT' }),
    );
    expect(state.settings).toEqual(
      settingsReducer(undefined, { type: '@@INIT' }),
    );
  });

  it('should dispatch an action and update the state', () => {
    // Example dispatch and state change test
    store.dispatch({ type: 'settings/setSidebarVisible', payload: true });
    const state = store.getState();

    expect(state.settings.sidebarVisible).toBe(true);
  });

  it('should handle ignored actions without serializability errors', () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    store.dispatch({
      type: 'settings/showToast',
      payload: {
        promise,
        loadingMessage: 'Loading...',
        successMessage: 'Success!',
        errorMessage: 'Error!',
      },
    });

    const state = store.getState();
    expect(state.settings.toastVisible).toBe(true);
    expect(state.settings.toastPromise).toBe(promise);
  });
});
