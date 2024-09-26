import { render, screen, fireEvent } from '@testing-library/react';
import {
  setProductsSortby,
  toggleProductsSort,
} from '../../../../renderer/store/products';
import Filters from '../../../../renderer/components/Products/Filters';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('../../../../renderer/store/products', () => ({
  setProductsSortby: jest.fn(),
  toggleProductsSort: jest.fn(),
}));

describe('Filters Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dropdown and button when productsSortby and productsSort are present', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsSort: 'asc',
          productsSortby: 'name',
        },
      }),
    );

    render(<Filters />);

    const dropdown = screen.getByTestId('sort-dropdown');
    expect(dropdown).toBeInTheDocument();

    const button = screen.getByTestId('sort-direction-button');
    expect(button).toBeInTheDocument();
  });

  it('dispatches setProductsSortby action when the dropdown value is changed', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsSort: 'asc',
          productsSortby: 'name',
        },
      }),
    );

    render(<Filters />);

    fireEvent.click(screen.getByTestId('sort-dropdown'));

    const option = screen.getByText('Created at');
    fireEvent.click(option);

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsSortby({ sortby: 'createdAt' }),
    );
  });

  it('dispatches toggleProductsSort action when the button is clicked', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsSort: 'asc',
          productsSortby: 'name',
        },
      }),
    );

    render(<Filters />);

    const button = screen.getByTestId('sort-direction-button');
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(toggleProductsSort());
  });

  it('renders the down arrow icon when the sort direction is descending', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsSort: 'desc',
          productsSortby: 'name',
        },
      }),
    );

    render(<Filters />);

    const sortIcon = screen.getByTestId('sort-icon');
    expect(sortIcon).toHaveClass('long arrow alternate down');
  });
});
