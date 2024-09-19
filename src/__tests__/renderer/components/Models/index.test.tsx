import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Models from '../../../../renderer/components/Models/index';
import modelsReducer, { initialModelsState, ModelsState } from '../../../../renderer/store/models';
import productsReducer, { initialProductsState, ProductsState } from '../../../../renderer/store/products';
import incrementsReducer, { IncrementsState, initialIncrementsState } from '../../../../renderer/store/increments';
import useFetchModels from '../../../../renderer/hooks/useFetchModels';

// Mock the dependent components and hooks
jest.mock('../../../../renderer/hooks/useFetchModels');
jest.mock('../../../../renderer/components/Models/Loader', () => () => <div>Loader Component</div>);
jest.mock('../../../../renderer/components/Models/Error', () => () => <div>Error Component</div>);
jest.mock('../../../../renderer/components/Models/Empty', () => () => <div>Empty Component</div>);
jest.mock('../../../../renderer/components/Models/List', () => () => <div>List Component</div>);
jest.mock('../../../../renderer/components/Models/Add', () => () => <div>Add Component</div>);
jest.mock('../../../../renderer/components/Models/Modal', () => () => <div>Modal Component</div>);
jest.mock('../../../../renderer/components/Models/ConfirmDelete', () => () => <div>ConfirmDelete Component</div>);

// Define RootState interface and createTestStore function
interface RootState {
  models: ModelsState;
  products: ProductsState;
  increments: IncrementsState;
}

const createTestStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      models: modelsReducer,
      products: productsReducer,
      increments: incrementsReducer,
    },
    preloadedState: initialState as RootState,
  });
};

const renderWithStore = (ui: React.ReactElement, initialState: Partial<RootState> = {}) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

// Tests
describe('Models Component', () => {
  const mockProduct = { id: '1', name: 'Test Product', createdAt: '1' };
  const mockIncrement = { id: '1', name: 'Test Increment', productId: '1' };

  const initialState = {
    models: initialModelsState,
    products: { ...initialProductsState, product: mockProduct },
    increments: { ...initialIncrementsState, increment: mockIncrement },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchModels as jest.Mock).mockImplementation(() => {});
  });

  it('should render the Add and Modal components', () => {
    renderWithStore(<Models product={mockProduct} increment={mockIncrement} />, initialState);

    // Check if Add and Modal components are rendered
    expect(screen.getByText('Add Component')).toBeInTheDocument();
    expect(screen.getByText('Modal Component')).toBeInTheDocument();
  });

  it('should render the Loader, Error, Empty, and List components', () => {
    renderWithStore(<Models product={mockProduct} increment={mockIncrement} />, initialState);

    // Check if all the components are rendered
    expect(screen.getByText('Loader Component')).toBeInTheDocument();
    expect(screen.getByText('Error Component')).toBeInTheDocument();
    expect(screen.getByText('Empty Component')).toBeInTheDocument();
    expect(screen.getByText('List Component')).toBeInTheDocument();
  });

  it('should render the ConfirmDelete component', () => {
    renderWithStore(<Models product={mockProduct} increment={mockIncrement} />, initialState);

    // Check if ConfirmDelete component is rendered
    expect(screen.getByText('ConfirmDelete Component')).toBeInTheDocument();
  });
});
