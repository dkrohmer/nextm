import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Grid } from 'semantic-ui-react';
import Description from '../../../../renderer/components/Product/Description';
import { RootState } from '../../../../renderer/store';
import { initialProductsState } from '../../../../renderer/store/products';

// Mock state
const mockProductState: Partial<RootState> = {
  products: {
    ...initialProductsState,
    product: {
      id: 'product-123',
      name: 'Test Product',
      createdAt: '1',
      description: 'This is a test description',
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

describe('Description Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct description', () => {
    renderWithProviders(<Description />);

    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('renders "n/a" when description is not available', () => {
    // Mock state where description is not provided
    const mockEmptyState: Partial<RootState> = {
      products: {
        ...initialProductsState,
        product: {
          id: 'product-123',
          name: 'Test Product',
          createdAt: '1',
          description: '',
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
          <Description />
        </Grid>
      </Provider>,
    );

    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText('n/a')).toBeInTheDocument();
  });
});
