import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {
  setOpenConfirm,
  setProductToDelete,
} from '../../../../renderer/store/products';
import TableCellActionsDelete from '../../../../renderer/components/Products/TableCellActionsDelete';
import { IProduct } from '../../../../renderer/interfaces/IProduct';

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
  createdAt: '2024-08-01T00:00:00Z',
  endsAt: '2024-08-31T23:59:59Z',
  startsAt: '2024-08-01T00:00:00Z',
};

const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('TableCellActionsDelete Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the delete button and popup content', () => {
    renderWithRedux(<TableCellActionsDelete product={mockProduct} />);

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.querySelector('.trash.icon')).toBeInTheDocument();

    fireEvent.mouseEnter(deleteButton);

    expect(screen.getByText(/delete product/i)).toBeInTheDocument();
    expect(screen.getByText(/"Test Product"/)).toBeInTheDocument();
  });

  it('dispatches the correct actions when the delete button is clicked', () => {
    renderWithRedux(<TableCellActionsDelete product={mockProduct} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    const actions = store.getState().products;

    expect(actions.productToDelete).toBe(mockProduct.id);
    expect(actions.openConfirm).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', () => {
    renderWithRedux(<TableCellActionsDelete product={mockProduct} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.mouseEnter(deleteButton);

    expect(screen.getByText(/delete product/i)).toBeInTheDocument();

    fireEvent.mouseLeave(deleteButton);
    expect(screen.queryByText(/delete product/i)).not.toBeInTheDocument();
  });

  it('closes the popup when onClose is triggered', () => {
    renderWithRedux(<TableCellActionsDelete product={mockProduct} />);

    const deleteButton = screen.getByRole('button');
    
    fireEvent.mouseEnter(deleteButton);
    expect(screen.getByText(/delete product/i)).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(screen.queryByText(/delete product/i)).not.toBeInTheDocument();
  });
});
