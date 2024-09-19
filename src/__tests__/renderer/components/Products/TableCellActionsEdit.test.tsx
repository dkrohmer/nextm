import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {
  setProductsIsEditing,
  setProductsCurrentProduct,
  setProductsModalOpen,
} from '../../../../renderer/store/products';
import TableCellActionsEdit from '../../../../renderer/components/Products/TableCellActionsEdit';
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

describe('TableCellActionsEdit Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the edit button and popup content', () => {
    renderWithRedux(<TableCellActionsEdit product={mockProduct} />);

    const editButton = screen.getByRole('button');
    expect(editButton).toBeInTheDocument();
    expect(editButton.querySelector('.pencil.icon')).toBeInTheDocument(); // Check for the pencil icon

    fireEvent.mouseEnter(editButton);

    expect(screen.getByText(/edit product/i)).toBeInTheDocument();
    expect(screen.getByText(/"Test Product"/)).toBeInTheDocument();
  });

  it('dispatches the correct actions when the edit button is clicked', () => {
    renderWithRedux(<TableCellActionsEdit product={mockProduct} />);

    const editButton = screen.getByRole('button');
    fireEvent.click(editButton);

    const actions = store.getState().products;

    expect(actions.productsIsEditing).toBe(true);
    expect(actions.productsCurrentProduct).toEqual(mockProduct);
    expect(actions.productsModalOpen).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', () => {
    renderWithRedux(<TableCellActionsEdit product={mockProduct} />);

    const editButton = screen.getByRole('button');
    fireEvent.mouseEnter(editButton);

    expect(screen.getByText(/edit product/i)).toBeInTheDocument();

    fireEvent.mouseLeave(editButton);
    expect(screen.queryByText(/edit product/i)).not.toBeInTheDocument();
  });

  it('closes the popup when onClose is triggered', () => {
    renderWithRedux(<TableCellActionsEdit product={mockProduct} />);

    const editButton = screen.getByRole('button');
    
    fireEvent.mouseEnter(editButton);
    expect(screen.getByText(/edit product/i)).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(screen.queryByText(/edit product/i)).not.toBeInTheDocument();
  });
});
