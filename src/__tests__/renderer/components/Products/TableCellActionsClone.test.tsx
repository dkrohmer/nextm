import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {
  setProductsIsCloning,
  setProductsCurrentProduct,
  setProductsModalOpen,
} from '../../../../renderer/store/products';
import TableCellActionsClone from '../../../../renderer/components/Products/TableCellActionsClone';
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

describe('TableCellActionsClone Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the clone button and popup content', () => {
    renderWithRedux(<TableCellActionsClone product={mockProduct} />);

    const cloneButton = screen.getByRole('button');
    expect(cloneButton).toBeInTheDocument();
    expect(cloneButton.querySelector('.clone.icon')).toBeInTheDocument();

    fireEvent.mouseEnter(cloneButton);

    expect(screen.getByText(/clone product/i)).toBeInTheDocument();
    expect(screen.getByText(/"Test Product"/)).toBeInTheDocument();
  });

  it('dispatches the correct actions when the clone button is clicked', () => {
    renderWithRedux(<TableCellActionsClone product={mockProduct} />);

    const cloneButton = screen.getByRole('button');
    fireEvent.click(cloneButton);

    const actions = store.getState().products;

    expect(actions.productsIsCloning).toBe(true);
    expect(actions.productsCurrentProduct).toEqual({
      ...mockProduct,
      name: `${mockProduct.name} (Copy)`,
    });
    expect(actions.productsModalOpen).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', () => {
    renderWithRedux(<TableCellActionsClone product={mockProduct} />);

    const cloneButton = screen.getByRole('button');
    fireEvent.mouseEnter(cloneButton);

    expect(screen.getByText(/clone product/i)).toBeInTheDocument();

    fireEvent.mouseLeave(cloneButton);
    expect(screen.queryByText(/clone product/i)).not.toBeInTheDocument();
  });

  it('closes the popup when onClose is triggered', () => {
    renderWithRedux(<TableCellActionsClone product={mockProduct} />);

    const cloneButton = screen.getByRole('button');
    
    fireEvent.mouseEnter(cloneButton);
    expect(screen.getByText(/clone product/i)).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(screen.queryByText(/clone product/i)).not.toBeInTheDocument();
  });
});
