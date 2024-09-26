import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Loader from '../../../../renderer/components/Models/Loader';
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

const renderWithStore = (
  ui: React.ReactElement,
  initialState: Partial<RootState> = {},
) => {
  const store = createTestStore(initialState);
  return render(<Provider store={store}>{ui}</Provider>);
};

// Tests
describe('Loader Component', () => {
  const initialState = {
    models: initialModelsState,
    products: initialProductsState,
    increments: initialIncrementsState,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the loader when models are loading', () => {
    const loadingState = {
      ...initialState,
      models: { ...initialModelsState, modelsIsLoading: true },
    };

    renderWithStore(<Loader />, loadingState);

    const loader = screen.getByTestId('models-loader');
    expect(loader).toHaveClass('active');
    expect(screen.getByText('Loading models...')).toBeInTheDocument();
  });

  it('should not be active when models are not loading', () => {
    const notLoadingState = {
      ...initialState,
      models: { ...initialModelsState, modelsIsLoading: false },
    };

    renderWithStore(<Loader />, notLoadingState);

    const loader = screen.getByTestId('models-loader');
    expect(loader).not.toHaveClass('active');
  });
});
