import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { IProduct } from '../../../../renderer/interfaces/IProduct';
import productsReducer from '../../../../renderer/store/products';
import ProductsTableRow from '../../../../renderer/components/Products/TableRow';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

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

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(`John Doe (Manager)`)).toBeInTheDocument();

    const formattedDeadline = new Date(
      mockProduct.endsAt!,
    ).toLocaleDateString();
    expect(screen.getByText(formattedDeadline)).toBeInTheDocument();

    const formattedCreatedAt = new Date(mockProduct.createdAt).toLocaleString();
    expect(screen.getByText(formattedCreatedAt)).toBeInTheDocument();
  });
});
