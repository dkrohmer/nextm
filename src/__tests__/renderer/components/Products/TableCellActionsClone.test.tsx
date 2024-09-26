import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { IProduct } from '../../../../renderer/interfaces/IProduct';
import productsReducer from '../../../../renderer/store/products';
import TableCellActionsClone from '../../../../renderer/components/Products/TableCellActionsClone';
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

describe('TableCellActionsClone Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the clone button and popup content', async () => {
    renderWithRedux(<TableCellActionsClone product={mockProduct} />);

    const cloneButton = screen.getByTestId('clone-button');
    expect(cloneButton).toBeInTheDocument();
    expect(cloneButton.querySelector('.clone.icon')).toBeInTheDocument();

    fireEvent.mouseEnter(cloneButton);

    await waitFor(() => {
      expect(screen.getByTestId('clone-popup-content')).toBeInTheDocument();
    });

    expect(screen.getByText(/"Test Product"/)).toBeInTheDocument();
  });

  it('dispatches the correct actions when the clone button is clicked', () => {
    renderWithRedux(<TableCellActionsClone product={mockProduct} />);

    const cloneButton = screen.getByTestId('clone-button');
    fireEvent.click(cloneButton);

    const actions = store.getState().products;

    expect(actions.productsIsCloning).toBe(true);
    expect(actions.productsCurrentProduct).toEqual({
      ...mockProduct,
      name: `${mockProduct.name} (Copy)`,
    });
    expect(actions.productsModalOpen).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', async () => {
    renderWithRedux(<TableCellActionsClone product={mockProduct} />);

    const cloneButton = screen.getByTestId('clone-button');
    fireEvent.mouseEnter(cloneButton);

    await waitFor(() => {
      expect(screen.getByTestId('clone-popup-content')).toBeInTheDocument();
    });

    fireEvent.mouseLeave(cloneButton);

    await waitFor(() => {
      expect(
        screen.queryByTestId('clone-popup-content'),
      ).not.toBeInTheDocument();
    });
  });

  it('closes the popup when onClose is triggered', async () => {
    renderWithRedux(<TableCellActionsClone product={mockProduct} />);

    const cloneButton = screen.getByTestId('clone-button');
    fireEvent.mouseEnter(cloneButton);

    await waitFor(() => {
      expect(screen.getByTestId('clone-popup-content')).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      expect(
        screen.queryByTestId('clone-popup-content'),
      ).not.toBeInTheDocument();
    });
  });

  it('truncates the product name if it exceeds 250 characters', () => {
    const longName = 'A'.repeat(251);
    const mockProductWithLongName: IProduct = {
      id: '1',
      name: longName,
      createdAt: '2024-08-01T00:00:00Z',
      endsAt: '2024-08-31T23:59:59Z',
      startsAt: '2024-08-01T00:00:00Z',
    };

    renderWithRedux(
      <TableCellActionsClone product={mockProductWithLongName} />,
    );

    const cloneButton = screen.getByRole('button');
    fireEvent.click(cloneButton);

    const state = store.getState().products;

    const truncatedName = `...${longName.slice(-240)} (Copy)`;

    expect(state.productsCurrentProduct?.name).toBe(truncatedName);
    expect(state.productsIsCloning).toBe(true);
    expect(state.productsModalOpen).toBe(true);
  });
});
