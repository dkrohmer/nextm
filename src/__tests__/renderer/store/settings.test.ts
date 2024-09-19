import reducer, {
  initialSettingsState,
  setSidebarVisible,
  showToast,
  hideToast,
  setGridVisible,
  setDatabasePath,
  setExplicitObjectSelection,
  setUseDefaultDatabase,
  setInputPath,
  setButtonLabel,
  setActiveSettingsIndex,
  setCustomDatabasePath,
  SettingsState,
} from '../../../renderer/store/settings';

describe('settingsSlice', () => {
  let initialState: SettingsState;

  beforeEach(() => {
    initialState = { ...initialSettingsState };
  });

  it('should handle setSidebarVisible', () => {
    const state = reducer(initialState, setSidebarVisible(true));
    expect(state.sidebarVisible).toBe(true);
  });

  it('should handle showToast', () => {
    const toastPromise = new Promise((resolve) => resolve('Success'));
    const actionPayload = {
      promise: toastPromise,
      loadingMessage: 'Loading...',
      successMessage: 'Success!',
      errorMessage: 'Error!',
    };

    const state = reducer(initialState, showToast(actionPayload));
    expect(state.toastVisible).toBe(true);
    expect(state.toastPromise).toBe(toastPromise);
    expect(state.toastLoadingMessage).toBe('Loading...');
    expect(state.toastSuccessMessage).toBe('Success!');
    expect(state.toastErrorMessage).toBe('Error!');
  });

  it('should handle hideToast', () => {
    initialState.toastVisible = true;
    initialState.toastPromise = Promise.resolve();
    initialState.toastLoadingMessage = 'Loading...';
    initialState.toastSuccessMessage = 'Success!';
    initialState.toastErrorMessage = 'Error!';

    const state = reducer(initialState, hideToast());
    expect(state.toastVisible).toBe(false);
    expect(state.toastPromise).toBeNull();
    expect(state.toastLoadingMessage).toBe('');
    expect(state.toastSuccessMessage).toBe('');
    expect(state.toastErrorMessage).toBe('');
  });

  it('should handle setGridVisible', () => {
    const state = reducer(initialState, setGridVisible('dot'));
    expect(state.gridVisible).toBe('dot');
  });

  it('should handle setDatabasePath', () => {
    const state = reducer(initialState, setDatabasePath('/path/to/database'));
    expect(state.path).toBe('/path/to/database');
  });

  it('should handle setExplicitObjectSelection', () => {
    const state = reducer(initialState, setExplicitObjectSelection(true));
    expect(state.explicitObjectSelection).toBe(true);
  });

  it('should handle setUseDefaultDatabase', () => {
    const state = reducer(initialState, setUseDefaultDatabase(false));
    expect(state.useDefaultDatabase).toBe(false);
  });

  it('should handle setInputPath', () => {
    const state = reducer(initialState, setInputPath('/input/path'));
    expect(state.inputPath).toBe('/input/path');
  });

  it('should handle setButtonLabel', () => {
    const state = reducer(initialState, setButtonLabel('Save'));
    expect(state.buttonLabel).toBe('Save');
  });

  it('should handle setActiveSettingsIndex', () => {
    const state = reducer(initialState, setActiveSettingsIndex(2));
    expect(state.activeSettingsIndex).toBe(2);
  });

  it('should handle setCustomDatabasePath', () => {
    const state = reducer(initialState, setCustomDatabasePath('/custom/path'));
    expect(state.customDatabasePath).toBe('/custom/path');
  });
});
