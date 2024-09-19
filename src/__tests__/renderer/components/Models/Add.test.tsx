// Add.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Add from '../../../../renderer/components/Models/Add';
import modelsReducer, { ModelsState, setModelsCurrentModel, setModelsIsEditing, setModelsModalOpen } from '../../../../renderer/store/models';
import productsReducer, { ProductsState } from '../../../../renderer/store/products';
import { initialModelsState } from '../../../../renderer/store/models';
import { initialProductsState } from '../../../../renderer/store/products';

// Define RootState interface and createTestStore function
interface RootState {
  models: ModelsState;
  products: ProductsState;
}

const createTestStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      models: modelsReducer,
      products: productsReducer,
    },
    preloadedState: initialState as RootState,
  });
};

const renderWithStore = (ui: React.ReactElement, initialState: Partial<RootState> = {}) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

// Tests
describe('Add Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithStore(<Add />, {
      models: { ...initialModelsState, modelsModalOpen: false },
      products: initialProductsState,
    });

    expect(screen.getByText(/\+ Add Threat Model/i)).toBeInTheDocument();
  });

  it('dispatches actions on click', () => {
    // Ensure mocks are correct
    jest.spyOn(require('../../../../renderer/store/models'), 'setModelsIsEditing').mockImplementation(() => ({ type: 'models/setModelsIsEditing', payload: false }));
    jest.spyOn(require('../../../../renderer/store/models'), 'setModelsModalOpen').mockImplementation(() => ({ type: 'models/setModelsModalOpen', payload: true }));
    jest.spyOn(require('../../../../renderer/store/models'), 'setModelsCurrentModel').mockImplementation(() => ({ type: 'models/setModelsCurrentModel', payload: {
      id: '',
      name: '',
      createdAt: '',
      incrementId: '',
    }}));

    renderWithStore(<Add />, {
      models: { ...initialModelsState, modelsModalOpen: false },
      products: initialProductsState,
    });

    fireEvent.click(screen.getByText(/\+ Add Threat Model/i));

    expect(setModelsIsEditing).toHaveBeenCalledWith(false);
    expect(setModelsModalOpen).toHaveBeenCalledWith(true);
    expect(setModelsCurrentModel).toHaveBeenCalledWith({
      id: '',
      name: '',
      createdAt: '',
      incrementId: '',
    });
  });

  it('does not dispatch actions if modal is already open', () => {
    jest.spyOn(require('../../../../renderer/store/models'), 'setModelsIsEditing').mockImplementation(() => {});
    jest.spyOn(require('../../../../renderer/store/models'), 'setModelsModalOpen').mockImplementation(() => {});
    jest.spyOn(require('../../../../renderer/store/models'), 'setModelsCurrentModel').mockImplementation(() => {});

    renderWithStore(<Add />, {
      models: { ...initialModelsState, modelsModalOpen: true },
      products: initialProductsState,
    });

    fireEvent.click(screen.getByText(/\+ Add Threat Model/i));

    expect(setModelsIsEditing).not.toHaveBeenCalled();
    expect(setModelsModalOpen).not.toHaveBeenCalled();
    expect(setModelsCurrentModel).not.toHaveBeenCalled();
  });
});
