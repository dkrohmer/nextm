import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../renderer/services/api/products';
import { RootState } from '../../../renderer/store';
import useFetchProducts from '../../../renderer/hooks/useFetchProducts';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../renderer/services/api/products', () => ({
  fetchProducts: jest.fn(),
}));

function TestComponent() {
  useFetchProducts();
  return null;
}

describe('useFetchProducts', () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        products: {
          productsCurrentPage: 2,
          productsItemsPerPage: 10,
          productsSort: 'asc',
          productsSortby: 'name',
        },
      } as RootState),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchProducts with the correct parameters', () => {
    render(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProducts({
        limit: 10,
        offset: 10,
        sort: 'asc',
        sortby: 'name',
      }),
    );
  });

  it('should dispatch fetchProducts when productsCurrentPage changes', () => {
    const { rerender } = render(<TestComponent />);

    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        products: {
          productsCurrentPage: 3,
          productsItemsPerPage: 10,
          productsSort: 'asc',
          productsSortby: 'name',
        },
      } as RootState),
    );

    rerender(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProducts({
        limit: 10,
        offset: 20,
        sort: 'asc',
        sortby: 'name',
      }),
    );
  });

  it('should dispatch fetchProducts when productsSort changes', () => {
    const { rerender } = render(<TestComponent />);

    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        products: {
          productsCurrentPage: 2,
          productsItemsPerPage: 10,
          productsSort: 'desc',
          productsSortby: 'name',
        },
      } as RootState),
    );

    rerender(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProducts({
        limit: 10,
        offset: 10,
        sort: 'desc',
        sortby: 'name',
      }),
    );
  });

  it('should dispatch fetchProducts when productsSortby changes', () => {
    const { rerender } = render(<TestComponent />);

    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        products: {
          productsCurrentPage: 2,
          productsItemsPerPage: 10,
          productsSort: 'asc',
          productsSortby: 'price',
        },
      } as RootState),
    );

    rerender(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProducts({
        limit: 10,
        offset: 10,
        sort: 'asc',
        sortby: 'price',
      }),
    );
  });
});
