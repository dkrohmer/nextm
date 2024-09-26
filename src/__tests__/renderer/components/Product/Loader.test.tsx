import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Loader from '../../../../renderer/components/Product/Loader';
import productsReducer, {
  initialProductsState,
  ProductsState,
} from '../../../../renderer/store/products';

// Define RootState interface and createTestStore function
interface RootState {
  products: ProductsState;
}

const createTestStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      products: productsReducer,
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
describe('Product Loader Component', () => {
  const initialState = {
    products: initialProductsState,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the loader when product is loading', () => {
    const loadingState = {
      products: { ...initialProductsState, productIsLoading: true },
    };

    renderWithStore(<Loader />, loadingState);

    const loader = screen.getByTestId('product-loader');
    expect(loader).toHaveClass('active');
    expect(screen.getByText('Loading Product...')).toBeInTheDocument();
  });

  it('should not render the loader when product is not loading', () => {
    const notLoadingState = {
      products: { ...initialProductsState, productIsLoading: false },
    };

    renderWithStore(<Loader />, notLoadingState);

    const loader = screen.getByTestId('product-loader');
    expect(loader).not.toHaveClass('active');
  });
});
