import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { IProduct } from '../../../../renderer/interfaces/IProduct';
import TableCellActionsEdit from '../../../../renderer/components/Products/TableCellActionsEdit';
import productsReducer from '../../../../renderer/store/products';
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

describe('TableCellActionsEdit Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the edit button and popup content', async () => {
    renderWithRedux(<TableCellActionsEdit product={mockProduct} />);

    const editButton = screen.getByTestId('edit-button');
    expect(editButton).toBeInTheDocument();
    expect(editButton.querySelector('.pencil.icon')).toBeInTheDocument();

    fireEvent.mouseEnter(editButton);

    await waitFor(() => {
      expect(screen.getByTestId('edit-popup-content')).toBeInTheDocument();
    });

    expect(screen.getByText(/"Test Product"/)).toBeInTheDocument();
  });

  it('dispatches the correct actions when the edit button is clicked', () => {
    renderWithRedux(<TableCellActionsEdit product={mockProduct} />);

    const editButton = screen.getByTestId('edit-button');
    fireEvent.click(editButton);

    const actions = store.getState().products;

    expect(actions.productsIsEditing).toBe(true);
    expect(actions.productsCurrentProduct).toEqual(mockProduct);
    expect(actions.productsModalOpen).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', async () => {
    renderWithRedux(<TableCellActionsEdit product={mockProduct} />);

    const editButton = screen.getByTestId('edit-button');
    fireEvent.mouseEnter(editButton);

    await waitFor(() => {
      expect(screen.getByTestId('edit-popup-content')).toBeInTheDocument();
    });

    fireEvent.mouseLeave(editButton);

    await waitFor(() => {
      expect(
        screen.queryByTestId('edit-popup-content'),
      ).not.toBeInTheDocument();
    });
  });

  it('closes the popup when onClose is triggered', async () => {
    renderWithRedux(<TableCellActionsEdit product={mockProduct} />);

    const editButton = screen.getByTestId('edit-button');
    fireEvent.mouseEnter(editButton);

    await waitFor(() => {
      expect(screen.getByTestId('edit-popup-content')).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      expect(
        screen.queryByTestId('edit-popup-content'),
      ).not.toBeInTheDocument();
    });
  });
});
