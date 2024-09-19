import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Grid } from 'semantic-ui-react';
import Responsibles from '../../../../renderer/components/Product/Responsibles';
import { RootState } from '../../../../renderer/store';
import { initialProductsState } from '../../../../renderer/store/products';

// Mock state with product responsibles
const mockProductStateWithResponsibles: Partial<RootState> = {
  products: {
    ...initialProductsState,
    product: {
      id: 'product-123',
      name: 'Test Product',
      createdAt: '1',
      responsibles: [
        { id: 'resp-1', firstName: 'John', lastName: 'Doe', role: 'Manager' },
        { id: 'resp-2', firstName: 'Jane', lastName: 'Smith', role: '' },
      ],
    },
  },
};

// Mock state with no responsibles
const mockProductStateWithoutResponsibles: Partial<RootState> = {
  products: {
    ...initialProductsState,
    product: {
      id: 'product-123',
      name: 'Test Product',
      createdAt: '1',
      responsibles: [],
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

describe('Responsibles Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the responsibles when available', () => {
    renderWithProviders(<Responsibles />, mockProductStateWithResponsibles);

    expect(screen.getByText('Responsible(s):')).toBeInTheDocument();
    expect(screen.getByText('John Doe (Manager)')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders "n/a" when no responsibles are available', () => {
    renderWithProviders(<Responsibles />, mockProductStateWithoutResponsibles);

    expect(screen.getByText('Responsible(s):')).toBeInTheDocument();
    expect(screen.getByText('n/a')).toBeInTheDocument();
  });
});
