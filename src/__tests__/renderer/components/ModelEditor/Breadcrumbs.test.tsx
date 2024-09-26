import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { Graph } from '@antv/x6';
import Breadcrumbs from '../../../../renderer/components/ModelEditor/Breadcrumbs';

// Mocking the useNavigate hook
const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

// Mock saveModel function
jest.mock('../../../../renderer/utils/saveModel', () => ({
  saveModel: jest.fn(() => Promise.resolve()),
}));

const mockGraph = new Graph({
  container: document.createElement('div'),
});

const mockState = {
  products: {
    product: { id: 'product-123', name: 'Test Product' },
  },
  increments: {
    increment: { id: 'increment-456', name: 'Test Increment' },
  },
  models: {
    model: { id: 'model-789', name: 'Test Model' },
  },
  versions: {
    latestVersion: 'v1.0',
  },
};

const store = configureStore({
  reducer: {
    products: (state = mockState.products, action) => state,
    increments: (state = mockState.increments, action) => state,
    models: (state = mockState.models, action) => state,
    versions: (state = mockState.versions, action) => state,
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
    renderWithProviders(<Breadcrumbs graph={mockGraph} />);
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Increment')).toBeInTheDocument();
    expect(screen.getByText('Test Model')).toBeInTheDocument();
  });

  it('navigates to the correct path on breadcrumb section click', async () => {
    renderWithProviders(<Breadcrumbs graph={mockGraph} />);

    // Click on "Products"
    fireEvent.click(screen.getByText('Products'));

    // Wait for the navigateMock to be called
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/products');
    });

    // Click on "Test Product"
    fireEvent.click(screen.getByText('Test Product'));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/products/product-123');
    });

    // Click on "Test Increment"
    fireEvent.click(screen.getByText('Test Increment'));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        '/products/product-123/increments/increment-456',
      );
    });
  });

  it('does not navigate if graph is null', async () => {
    renderWithProviders(<Breadcrumbs graph={null} />);

    // Click on "Products"
    fireEvent.click(screen.getByText('Products'));

    // Ensure no navigation occurred
    await waitFor(() => {
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});
