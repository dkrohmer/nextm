import { render, screen, fireEvent } from '@testing-library/react';
import { fetchProducts } from '../../../../renderer/services/api/products';
import {
  setProductsItemsPerPage,
  resetProductsCurrentPage,
} from '../../../../renderer/store/products';
import ItemsPerPage from '../../../../renderer/components/Products/ItemsPerPage';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

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

    const dropdown = screen.getByTestId('items-per-page-dropdown');
    expect(dropdown).toBeInTheDocument();

    const selectedItem = screen.getByRole('option', { selected: true });
    expect(selectedItem).toHaveTextContent('10 items');
  });

  it('dispatches the correct actions when a new dropdown value is selected', async () => {
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

    fireEvent.click(screen.getByTestId('items-per-page-dropdown'));

    const option = screen.getByRole('option', { name: '25 items' });
    fireEvent.click(option);

    expect(mockDispatch).toHaveBeenCalledWith(setProductsItemsPerPage(25));
    expect(mockDispatch).toHaveBeenCalledWith(resetProductsCurrentPage());

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
