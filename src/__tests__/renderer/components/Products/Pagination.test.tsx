import { render, screen, fireEvent } from '@testing-library/react';
import { setProductsCurrentPage } from '../../../../renderer/store/products';
import { fetchProducts } from '../../../../renderer/services/api/products';
import Pagination from '../../../../renderer/components/Products/Pagination';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

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
      }),
    );

    render(<Pagination />);

    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();

    const activePageElement = screen.getByText('2');
    expect(activePageElement).toBeInTheDocument();

    const totalPages = Math.ceil(100 / 10);
    const totalPageElement = screen.getByText(totalPages.toString());
    expect(totalPageElement).toBeInTheDocument();
  });

  it('dispatches the correct actions when a new page is selected', async () => {
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
      }),
    );

    render(<Pagination />);

    const page3 = screen.getByText('3');
    fireEvent.click(page3);

    expect(mockDispatch).toHaveBeenCalledWith(setProductsCurrentPage(3));

    await expect(mockDispatch).toHaveBeenCalledWith(
      fetchProducts({
        limit: 10,
        offset: 20,
        sort: 'name',
        sortby: 'asc',
      }),
    );
  });
});
