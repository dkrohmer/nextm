import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import productsReducer from '../../../../renderer/store/products';
import ProductsTableRow from '../../../../renderer/components/Products/TableRow';
import { IProduct } from '../../../../renderer/interfaces/IProduct';

// Mocking useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock store
const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// Mock product data
const mockProduct: IProduct = {
  id: '1',
  name: 'Test Product',
  description: 'This is a test product',
  responsibles: [
    { id: 'r1', firstName: 'John', lastName: 'Doe', role: 'Manager' },
    { id: 'r2', firstName: 'Jane', lastName: 'Smith', role: 'Engineer' },
  ],
  endsAt: '2024-08-31T23:59:59Z',
  createdAt: '2024-08-01T12:34:56Z',
};

const renderWithRedux = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe('ProductsTableRow Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the product data in table cells', () => {
    renderWithRedux(<ProductsTableRow product={mockProduct} />);

    // Check that the product name is rendered in the TableCellName component
    expect(screen.getByText('Test Product')).toBeInTheDocument();

    // Check that the product description is rendered in the TableCellDescription component
    expect(screen.getByText(`John Doe (Manager)`)).toBeInTheDocument();

    // Check that the deadline is rendered in the TableCellDeadline component
    const formattedDeadline = new Date(
      mockProduct.endsAt!,
    ).toLocaleDateString();
    expect(screen.getByText(formattedDeadline)).toBeInTheDocument();

    // Check that the created date is rendered in the TableCellCreated component
    const formattedCreatedAt = new Date(mockProduct.createdAt).toLocaleString();
    expect(screen.getByText(formattedCreatedAt)).toBeInTheDocument();
  });
});
