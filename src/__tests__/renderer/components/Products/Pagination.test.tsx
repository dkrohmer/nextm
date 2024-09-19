import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../../../../renderer/components/Products/Pagination'; // Adjust the import path if necessary
import { setProductsCurrentPage } from '../../../../renderer/store/products';
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
  setProductsCurrentPage: jest.fn(),
}));

jest.mock('../../../../renderer/services/api/products', () => ({
  fetchProducts: jest.fn(),
}));

describe('Pagination Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the pagination component with the correct active page and total pages', () => {
    // Mock useSelector to return productsCurrentPage and other product-related states
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentPage: 2,
          products: {
            productsCount: 100,
          },
          productsItemsPerPage: 10,
          productsSort: 'name',
          productsSortby: 'asc',
        },
      })
    );

    render(<Pagination />);

    // Check if the pagination is rendered by using role
    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();

    // Check if the active page and total pages are correct
    const activePageElement = screen.getByText('2');
    expect(activePageElement).toBeInTheDocument();

    const totalPages = Math.ceil(100 / 10); // 10 pages
    const totalPageElement = screen.getByText(totalPages.toString());
    expect(totalPageElement).toBeInTheDocument();
  });

  it('dispatches the correct actions when a new page is selected', async () => {
    // Mock useSelector to return productsCurrentPage and other product-related states
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentPage: 1,
          products: {
            productsCount: 100,
          },
          productsItemsPerPage: 10,
          productsSort: 'name',
          productsSortby: 'asc',
        },
      })
    );

    render(<Pagination />);

    // Simulate selecting page 3
    const page3 = screen.getByText('3');
    fireEvent.click(page3);

    // Check if setProductsCurrentPage and fetchProducts were dispatched
    expect(mockDispatch).toHaveBeenCalledWith(setProductsCurrentPage(3));

    // Simulate the async fetchProducts call
    await expect(mockDispatch).toHaveBeenCalledWith(
      fetchProducts({
        limit: 10,
        offset: 20, // (3 - 1) * 10
        sort: 'name',
        sortby: 'asc',
      })
    );
  });
});
