import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import productsReducer from '../../../../renderer/store/products';
import TableCellName from '../../../../renderer/components/Products/TableCellName';

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

    // Check if product name is rendered
    const nameElement = screen.getByText(mockProduct.name);
    expect(nameElement).toBeInTheDocument();

    // Simulate mouse hover to show the popup
    fireEvent.mouseEnter(nameElement);

    // Wait for the popup to appear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible'); // Check for popup with 'popup' and 'visible' classes
      expect(popup).toBeInTheDocument();
    });

    // Simulate mouse leave to hide the popup
    fireEvent.mouseLeave(nameElement);

    // Wait for the popup to disappear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument(); // Check that popup is no longer visible
    });
  });

  it('navigates to the correct product page when name is clicked', async () => {
    renderWithRedux(
      <TableCellName name={mockProduct.name} productId={mockProduct.id} />,
    );

    // Simulate click on the product name
    const nameElement = screen.getByText(mockProduct.name);
    fireEvent.click(nameElement);

    // Verify that the navigate function was called with the correct path
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

    // Check if the popup is shown
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    // Simulate mouse leave to hide the popup
    fireEvent.mouseLeave(nameElement);

    // Wait for the popup to disappear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument(); // Check that popup is no longer visible
    });
  });

  it('closes the popup when clicking outside the component', async () => {
    renderWithRedux(
      <TableCellName name={mockProduct.name} productId={mockProduct.id} />,
    );

    const nameElement = screen.getByText(mockProduct.name);

    // Simulate mouse hover to show the popup
    fireEvent.mouseEnter(nameElement);

    // Wait for the popup to appear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    // Simulate clicking outside the component
    fireEvent.click(document.body);

    // Wait for the popup to disappear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument(); // Ensure the popup is no longer visible
    });
  });
});
