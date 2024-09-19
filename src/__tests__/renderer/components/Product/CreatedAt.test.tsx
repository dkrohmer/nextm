import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Grid } from 'semantic-ui-react';
import CreatedAt from '../../../../renderer/components/Product/CreatedAt';
import { RootState } from '../../../../renderer/store';
import { initialProductsState } from '../../../../renderer/store/products';

// Mock state
const mockProductState: Partial<RootState> = {
  products: {
    ...initialProductsState,
    product: { id: 'product-123', name: 'Test Product', createdAt: '2023-09-01T10:00:00Z' },
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
      <Grid>
        {component}
      </Grid>
    </Provider>
  );
};

describe('CreatedAt Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct created at date', () => {
    renderWithProviders(<CreatedAt />);

    const expectedDate = new Date('2023-09-01T10:00:00Z').toLocaleString();

    expect(screen.getByText('Created At:')).toBeInTheDocument();
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it('renders "n/a" when createdAt is not available', () => {
    // Mock state where createdAt is undefined
    const mockEmptyState: Partial<RootState> = {
      products: {
        ...initialProductsState, 
        product: { id: 'product-123', name: 'Test Product', createdAt: '' },
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
          <CreatedAt />
        </Grid>
      </Provider>
    );

    expect(screen.getByText('Created At:')).toBeInTheDocument();
    expect(screen.getByText('n/a')).toBeInTheDocument();
  });
});
