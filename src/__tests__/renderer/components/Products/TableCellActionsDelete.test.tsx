import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('renders the delete button and popup content', async () => {
    renderWithRedux(<TableCellActionsDelete product={mockProduct} />);

    const deleteButton = screen.getByTestId('delete-button');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.querySelector('.trash.icon')).toBeInTheDocument();

    fireEvent.mouseEnter(deleteButton);

    // Wait for the popup content to appear
    await waitFor(() => {
      expect(screen.getByTestId('delete-popup-content')).toBeInTheDocument();
    });

    expect(screen.getByText(/"Test Product"/)).toBeInTheDocument();
  });

  it('dispatches the correct actions when the delete button is clicked', () => {
    renderWithRedux(<TableCellActionsDelete product={mockProduct} />);

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    const actions = store.getState().products;

    expect(actions.productToDelete).toBe(mockProduct.id);
    expect(actions.openConfirm).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', async () => {
    renderWithRedux(<TableCellActionsDelete product={mockProduct} />);

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.mouseEnter(deleteButton);

    // Wait for the popup content to appear
    await waitFor(() => {
      expect(screen.getByTestId('delete-popup-content')).toBeInTheDocument();
    });

    fireEvent.mouseLeave(deleteButton);

    // Ensure the popup content disappears
    await waitFor(() => {
      expect(
        screen.queryByTestId('delete-popup-content'),
      ).not.toBeInTheDocument();
    });
  });

  it('closes the popup when onClose is triggered', async () => {
    renderWithRedux(<TableCellActionsDelete product={mockProduct} />);

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.mouseEnter(deleteButton);

    // Wait for the popup content to appear
    await waitFor(() => {
      expect(screen.getByTestId('delete-popup-content')).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    // Ensure the popup content disappears after clicking outside
    await waitFor(() => {
      expect(
        screen.queryByTestId('delete-popup-content'),
      ).not.toBeInTheDocument();
    });
  });
});
