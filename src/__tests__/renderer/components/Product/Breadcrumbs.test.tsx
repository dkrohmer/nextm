import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { RootState } from '../../../../renderer/store';
import { initialProductsState } from '../../../../renderer/store/products';
import Breadcrumbs from '../../../../renderer/components/Product/Breadcrumbs';
import '@testing-library/jest-dom';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

const mockState: Partial<RootState> = {
  products: {
    ...initialProductsState,
    product: { id: 'product-123', name: 'Test Product', createdAt: '1' },
  },
};

const store = configureStore({
  reducer: {
    products: (state = mockState.products, action) => state,
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe('Breadcrumbs Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders breadcrumb sections with correct text', () => {
    renderWithProviders(<Breadcrumbs />);

    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('navigates to the correct path on "Products" section click', async () => {
    renderWithProviders(<Breadcrumbs />);

    fireEvent.click(screen.getByText('Products'));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/products');
    });
  });

  it('renders "Loading..." when product is not available', () => {
    const mockEmptyState: Partial<RootState> = {
      products: { ...initialProductsState, product: null },
    };

    const emptyStore = configureStore({
      reducer: {
        products: (state = mockEmptyState.products, action) => state,
      },
    });

    render(
      <Provider store={emptyStore}>
        <MemoryRouter>
          <Breadcrumbs />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
