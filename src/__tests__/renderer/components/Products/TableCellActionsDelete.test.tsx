import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { IProduct } from '../../../../renderer/interfaces/IProduct';
import TableCellActionsDelete from '../../../../renderer/components/Products/TableCellActionsDelete';
import productsReducer  from '../../../../renderer/store/products';
import '@testing-library/jest-dom';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

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

    await waitFor(() => {
      expect(screen.getByTestId('delete-popup-content')).toBeInTheDocument();
    });

    fireEvent.mouseLeave(deleteButton);

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

    await waitFor(() => {
      expect(screen.getByTestId('delete-popup-content')).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      expect(
        screen.queryByTestId('delete-popup-content'),
      ).not.toBeInTheDocument();
    });
  });
});
