import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Grid } from 'semantic-ui-react';
import StartsAt from '../../../../renderer/components/Product/StartsAt';
import { RootState } from '../../../../renderer/store';
import { initialProductsState } from '../../../../renderer/store/products';

// Mock state with a product that has a startsAt date
const mockProductStateWithStartDate: Partial<RootState> = {
  products: {
    ...initialProductsState,
    product: {
      id: 'product-123',
      name: 'Test Product',
      createdAt: '2023-09-01T10:00:00Z',
      startsAt: '2023-10-01T10:00:00Z',
    },
  },
};

// Mock state with no startsAt date
const mockProductStateWithoutStartDate: Partial<RootState> = {
  products: {
    ...initialProductsState,
    product: {
      id: 'product-123',
      name: 'Test Product',
      createdAt: '2023-09-01T10:00:00Z',
      startsAt: '',
    },
  },
};

const createTestStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      products: (state = initialState.products, action) => state,
    },
  });
};

const renderWithProviders = (component: React.ReactElement, initialState: Partial<RootState>) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      <Grid>
        {component}
      </Grid>
    </Provider>
  );
};

describe('StartsAt Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct starts at date', () => {
    renderWithProviders(<StartsAt />, mockProductStateWithStartDate);

    const expectedDate = new Date('2023-10-01T10:00:00Z').toLocaleDateString();

    expect(screen.getByText('Starts At:')).toBeInTheDocument();
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it('renders "n/a" when startsAt is not available', () => {
    renderWithProviders(<StartsAt />, mockProductStateWithoutStartDate);

    expect(screen.getByText('Starts At:')).toBeInTheDocument();
    expect(screen.getByText('n/a')).toBeInTheDocument();
  });
});
