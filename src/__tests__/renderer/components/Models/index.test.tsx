import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import modelsReducer, {
  initialModelsState,
  ModelsState,
} from '../../../../renderer/store/models';
import productsReducer, {
  initialProductsState,
  ProductsState,
} from '../../../../renderer/store/products';
import incrementsReducer, {
  IncrementsState,
  initialIncrementsState,
} from '../../../../renderer/store/increments';
import Models from '../../../../renderer/components/Models/index';
import useFetchModels from '../../../../renderer/hooks/useFetchModels';

jest.mock('../../../../renderer/hooks/useFetchModels');
jest.mock(
  '../../../../renderer/components/Models/Loader',
  () =>
    function () {
      return <div>Loader Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Models/Error',
  () =>
    function () {
      return <div>Error Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Models/Empty',
  () =>
    function () {
      return <div>Empty Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Models/List',
  () =>
    function () {
      return <div>List Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Models/Add',
  () =>
    function () {
      return <div>Add Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Models/Modal',
  () =>
    function () {
      return <div>Modal Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Models/ConfirmDelete',
  () =>
    function () {
      return <div>ConfirmDelete Component</div>;
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
    renderWithStore(
      <Models product={mockProduct} increment={mockIncrement} />,
      initialState,
    );

    expect(screen.getByText('Add Component')).toBeInTheDocument();
    expect(screen.getByText('Modal Component')).toBeInTheDocument();
  });

  it('should render the Loader, Error, Empty, and List components', () => {
    renderWithStore(
      <Models product={mockProduct} increment={mockIncrement} />,
      initialState,
    );

    expect(screen.getByText('Loader Component')).toBeInTheDocument();
    expect(screen.getByText('Error Component')).toBeInTheDocument();
    expect(screen.getByText('Empty Component')).toBeInTheDocument();
    expect(screen.getByText('List Component')).toBeInTheDocument();
  });

  it('should render the ConfirmDelete component', () => {
    renderWithStore(
      <Models product={mockProduct} increment={mockIncrement} />,
      initialState,
    );

    expect(screen.getByText('ConfirmDelete Component')).toBeInTheDocument();
  });
});
