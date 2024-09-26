import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import productsReducer from '../../../../renderer/store/products';
import TableCellName from '../../../../renderer/components/Products/TableCellName';
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

const mockProduct = {
  id: '12345',
  name: 'Test Product',
};

const renderWithRedux = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe('TableCellName Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the product name and shows the popup content on hover', async () => {
    renderWithRedux(
      <TableCellName name={mockProduct.name} productId={mockProduct.id} />,
    );

    const nameElement = screen.getByText(mockProduct.name);
    expect(nameElement).toBeInTheDocument();

    fireEvent.mouseEnter(nameElement);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    fireEvent.mouseLeave(nameElement);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });

  it('navigates to the correct product page when name is clicked', async () => {
    renderWithRedux(
      <TableCellName name={mockProduct.name} productId={mockProduct.id} />,
    );

    const nameElement = screen.getByText(mockProduct.name);
    fireEvent.click(nameElement);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(`/products/${mockProduct.id}`);
    });
  });

  it('hides the popup when the mouse leaves the cell', async () => {
    renderWithRedux(
      <TableCellName name={mockProduct.name} productId={mockProduct.id} />,
    );

    const nameElement = screen.getByText(mockProduct.name);
    fireEvent.mouseEnter(nameElement);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    fireEvent.mouseLeave(nameElement);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });

  it('closes the popup when clicking outside the component', async () => {
    renderWithRedux(
      <TableCellName name={mockProduct.name} productId={mockProduct.id} />,
    );

    const nameElement = screen.getByText(mockProduct.name);

    fireEvent.mouseEnter(nameElement);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });
});
