import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemsPerPage from '../../../../renderer/components/Products/ItemsPerPage'; // Adjust the import path if necessary
import {
  setProductsItemsPerPage,
  resetProductsCurrentPage,
} from '../../../../renderer/store/products';
import { fetchProducts } from '../../../../renderer/services/api/products';

// Mocking useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

// Mocking the necessary Redux actions and API call
jest.mock('../../../../renderer/store/products', () => ({
  setProductsItemsPerPage: jest.fn(),
  resetProductsCurrentPage: jest.fn(),
}));

jest.mock('../../../../renderer/services/api/products', () => ({
  fetchProducts: jest.fn(),
}));

describe('ItemsPerPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dropdown with the correct value', () => {
    // Mock useSelector to return productsItemsPerPage and other product-related states
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsItemsPerPage: 10,
          productsSort: 'name',
          productsSortby: 'asc',
        },
      }),
    );

    render(<ItemsPerPage />);

    // Check if the Dropdown is rendered
    const dropdown = screen.getByTestId('items-per-page-dropdown');
    expect(dropdown).toBeInTheDocument();

    // Use getByRole to specifically target the selected option with aria-selected="true"
    const selectedItem = screen.getByRole('option', { selected: true });
    expect(selectedItem).toHaveTextContent('10 items');
  });

  it('dispatches the correct actions when a new dropdown value is selected', async () => {
    // Mock useSelector to return productsItemsPerPage and other product-related states
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsItemsPerPage: 10,
          productsSort: 'name',
          productsSortby: 'asc',
        },
      }),
    );

    render(<ItemsPerPage />);

    // Simulate opening the dropdown
    fireEvent.click(screen.getByTestId('items-per-page-dropdown'));

    // Simulate selecting the option "25 items"
    const option = screen.getByRole('option', { name: '25 items' });
    fireEvent.click(option);

    // Check if setProductsItemsPerPage and resetProductsCurrentPage were dispatched
    expect(mockDispatch).toHaveBeenCalledWith(setProductsItemsPerPage(25));
    expect(mockDispatch).toHaveBeenCalledWith(resetProductsCurrentPage());

    // Simulate the async fetchProducts call
    await expect(mockDispatch).toHaveBeenCalledWith(
      fetchProducts({
        limit: 25,
        offset: 0,
        sort: 'name',
        sortby: 'asc',
      }),
    );
  });
});
