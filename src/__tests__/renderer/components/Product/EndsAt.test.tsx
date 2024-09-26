import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Grid } from 'semantic-ui-react';
import { RootState } from '../../../../renderer/store';
import { initialProductsState } from '../../../../renderer/store/products';
import EndsAt from '../../../../renderer/components/Product/EndsAt';
import '@testing-library/jest-dom';

const mockProductState: Partial<RootState> = {
  products: {
    ...initialProductsState,
    product: {
      id: 'product-123',
      name: 'Test Product',
      createdAt: '1',
      endsAt: '2023-12-01T11:00:00Z',
    },
  },
};

const store = configureStore({
  reducer: {
    products: (state = mockProductState.products, action) => state,
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <Grid>{component}</Grid>
    </Provider>,
  );
};

describe('EndsAt Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct ends at date', () => {
    renderWithProviders(<EndsAt />);

    const expectedDate = new Date('2023-12-01T11:00:00Z').toLocaleDateString();

    expect(screen.getByText('Ends At:')).toBeInTheDocument();
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it('renders "n/a" when endsAt is not available', () => {
    const mockEmptyState: Partial<RootState> = {
      products: {
        ...initialProductsState,
        product: {
          id: 'product-123',
          name: 'Test Product',
          createdAt: '1',
          endsAt: '',
        },
      },
    };

    const emptyStore = configureStore({
      reducer: {
        products: (state = mockEmptyState.products, action) => state,
      },
    });

    render(
      <Provider store={emptyStore}>
        <Grid>
          <EndsAt />
        </Grid>
      </Provider>,
    );

    expect(screen.getByText('Ends At:')).toBeInTheDocument();
    expect(screen.getByText('n/a')).toBeInTheDocument();
  });
});
