import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { IModel } from '../../../../renderer/interfaces/IModel';
import modelsReducer, {
  initialModelsState,
  ModelsState,
} from '../../../../renderer/store/models';
import productsReducer, {
  initialProductsState,
  ProductsState,
} from '../../../../renderer/store/products';
import incrementsReducer, {
  initialIncrementsState,
  IncrementsState,
} from '../../../../renderer/store/increments';
import List from '../../../../renderer/components/Models/List';

jest.mock(
  '../../../../renderer/components/Model',
  () =>
    function () {
      return <div>Model Component</div>;
    },
);

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

const renderWithStore = (
  ui: React.ReactElement,
  initialState: Partial<RootState> = {},
) => {
  const store = createTestStore(initialState);
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('List Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    createdAt: '2023-08-01',
  };
  const mockIncrement = { id: '1', name: 'Test Increment', productId: '1' };
  const mockModels: IModel[] = [
    { id: '1', name: 'Model 1', createdAt: '2023-08-01', incrementId: '1' },
    { id: '2', name: 'Model 2', createdAt: '2023-08-02', incrementId: '1' },
  ];

  const initialState = {
    models: { ...initialModelsState, models: mockModels },
    products: { ...initialProductsState, product: mockProduct },
    increments: { ...initialIncrementsState, increment: mockIncrement },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the list of models', () => {
    renderWithStore(
      <List product={mockProduct} increment={mockIncrement} />,
      initialState,
    );

    expect(screen.getAllByText('Model Component').length).toBe(2);
  });

  it('should not render the list if models are empty', () => {
    const emptyState = {
      ...initialState,
      models: { ...initialModelsState, models: [] },
    };

    renderWithStore(
      <List product={mockProduct} increment={mockIncrement} />,
      emptyState,
    );

    expect(screen.queryByText('Model Component')).not.toBeInTheDocument();
  });

  it('should not render the list if models are loading', () => {
    const loadingState = {
      ...initialState,
      models: { ...initialModelsState, modelsIsLoading: true },
    };

    renderWithStore(
      <List product={mockProduct} increment={mockIncrement} />,
      loadingState,
    );

    expect(screen.queryByText('Model Component')).not.toBeInTheDocument();
  });

  it('should not render the list if there is an error', () => {
    const errorState = {
      ...initialState,
      models: { ...initialModelsState, modelsError: 'Error loading models' },
    };

    renderWithStore(
      <List product={mockProduct} increment={mockIncrement} />,
      errorState,
    );

    expect(screen.queryByText('Model Component')).not.toBeInTheDocument();
  });
});
