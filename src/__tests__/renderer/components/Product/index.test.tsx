import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '../../../../renderer/store';
import { initialProductsState } from '../../../../renderer/store/products';
import Product from '../../../../renderer/components/Product';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/hooks/useFetchProduct', () => jest.fn());
jest.mock(
  '../../../../renderer/components/Product/Breadcrumbs',
  () =>
    function () {
      return <div>Breadcrumbs Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Product/Loader',
  () =>
    function () {
      return <div>Loader Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Product/Error',
  () =>
    function () {
      return <div>Error Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Product/Description',
  () =>
    function () {
      return <div>Description Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Product/Responsibles',
  () =>
    function () {
      return <div>Responsibles Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Product/StartsAt',
  () =>
    function () {
      return <div>StartsAt Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Product/EndsAt',
  () =>
    function () {
      return <div>EndsAt Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Product/CreatedAt',
  () =>
    function () {
      return <div>CreatedAt Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Increments',
  () =>
    function () {
      return <div>Increments Component</div>;
    },
);

const createTestStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      products: (state = initialState.products, action) => state,
    },
  });
};

const renderWithProviders = (
  component: React.ReactElement,
  initialState: Partial<RootState>,
) => {
  const store = createTestStore(initialState);
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Product Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    createdAt: '2023-09-01T10:00:00Z',
  };

  const initialStateWithProduct = {
    products: {
      ...initialProductsState,
      product: mockProduct,
      productIsLoading: false,
      productError: null,
    },
  };

  const initialStateWithLoading = {
    products: {
      ...initialProductsState,
      product: null,
      productIsLoading: true,
      productError: null,
    },
  };

  const initialStateWithError = {
    products: {
      ...initialProductsState,
      product: null,
      productIsLoading: false,
      productError: 'Failed to fetch product',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Loader and Breadcrumbs components when loading', () => {
    renderWithProviders(<Product />, initialStateWithLoading);

    expect(screen.getByText('Loader Component')).toBeInTheDocument();
    expect(screen.getByText('Breadcrumbs Component')).toBeInTheDocument();
  });

  it('renders the Error component when there is an error', () => {
    renderWithProviders(<Product />, initialStateWithError);

    expect(screen.getByText('Error Component')).toBeInTheDocument();
    expect(screen.getByText('Breadcrumbs Component')).toBeInTheDocument();
  });

  it('renders product details when the product is available and no error or loading', () => {
    renderWithProviders(<Product />, initialStateWithProduct);

    expect(screen.getByText('Breadcrumbs Component')).toBeInTheDocument();
    expect(screen.getByText('Increments Component')).toBeInTheDocument();

    expect(screen.getByText('Description Component')).toBeInTheDocument();
    expect(screen.getByText('Responsibles Component')).toBeInTheDocument();
    expect(screen.getByText('StartsAt Component')).toBeInTheDocument();
    expect(screen.getByText('EndsAt Component')).toBeInTheDocument();
    expect(screen.getByText('CreatedAt Component')).toBeInTheDocument();
  });

  it('does not render product details when product is null', () => {
    const initialStateWithoutProduct = {
      products: {
        ...initialProductsState,
        product: null,
        productIsLoading: false,
        productError: null,
      },
    };

    renderWithProviders(<Product />, initialStateWithoutProduct);

    expect(screen.getByText('Breadcrumbs Component')).toBeInTheDocument();
    expect(screen.queryByText('Description Component')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Responsibles Component'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('StartsAt Component')).not.toBeInTheDocument();
    expect(screen.queryByText('EndsAt Component')).not.toBeInTheDocument();
    expect(screen.queryByText('CreatedAt Component')).not.toBeInTheDocument();
  });
});
