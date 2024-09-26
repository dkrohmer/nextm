// src/__tests__/renderer/hooks/useFetchProducts.test.ts

import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import useFetchProducts from '../../../renderer/hooks/useFetchProducts';
import { fetchProducts } from '../../../renderer/services/api/products';
import { RootState } from '../../../renderer/store';

// Mock dependencies
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../renderer/services/api/products', () => ({
  fetchProducts: jest.fn(),
}));

// Helper component to test the hook
function TestComponent() {
  useFetchProducts();
  return null;
}

describe('useFetchProducts', () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    // Set up the mock dispatch and useSelector
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
        limit: 10, // productsItemsPerPage
        offset: 10, // (productsCurrentPage - 1) * productsItemsPerPage
        sort: 'asc', // productsSort
        sortby: 'name', // productsSortby
      }),
    );
  });

  it('should dispatch fetchProducts when productsCurrentPage changes', () => {
    const { rerender } = render(<TestComponent />);

    // Update the useSelector mock to simulate a page change
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

    expect(dispatchMock).toHaveBeenCalledTimes(2); // Once for the initial render and once for the page change
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProducts({
        limit: 10,
        offset: 20, // New offset: (3 - 1) * 10
        sort: 'asc',
        sortby: 'name',
      }),
    );
  });

  it('should dispatch fetchProducts when productsSort changes', () => {
    const { rerender } = render(<TestComponent />);

    // Update the useSelector mock to simulate a sort change
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

    expect(dispatchMock).toHaveBeenCalledTimes(2); // Initial render and sort change
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProducts({
        limit: 10,
        offset: 10,
        sort: 'desc', // New sort order
        sortby: 'name',
      }),
    );
  });

  it('should dispatch fetchProducts when productsSortby changes', () => {
    const { rerender } = render(<TestComponent />);

    // Update the useSelector mock to simulate a sortby change
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        products: {
          productsCurrentPage: 2,
          productsItemsPerPage: 10,
          productsSort: 'asc',
          productsSortby: 'price', // Changed sorting criterion
        },
      } as RootState),
    );

    rerender(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledTimes(2); // Initial render and sortby change
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProducts({
        limit: 10,
        offset: 10,
        sort: 'asc',
        sortby: 'price', // New sort criterion
      }),
    );
  });
});
