// src/__tests__/renderer/hooks/useFetchProduct.test.ts

import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetchProduct from '../../../renderer/hooks/useFetchProduct';
import { fetchProduct } from '../../../renderer/services/api/products';

// Mock dependencies
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../../renderer/services/api/products', () => ({
  fetchProduct: jest.fn(),
}));

// Helper component to test the hook
function TestComponent() {
  useFetchProduct();
  return null;
}

describe('useFetchProduct', () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    // Explicitly cast useDispatch to Jest mock
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useParams as jest.Mock).mockReturnValue({ productId: '123' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchProduct when productId is defined', () => {
    render(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProduct({ productId: '123', isEagerLoading: false }),
    );
  });

  it('should not dispatch fetchProduct if productId is undefined', () => {
    (useParams as jest.Mock).mockReturnValue({ productId: undefined });
    render(<TestComponent />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should not dispatch fetchProduct if productId is an empty string', () => {
    (useParams as jest.Mock).mockReturnValue({ productId: '' });
    render(<TestComponent />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should dispatch fetchProduct again if productId changes', () => {
    const { rerender } = render(<TestComponent />);

    // Re-render with a different productId
    (useParams as jest.Mock).mockReturnValue({ productId: '456' });
    rerender(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledTimes(2); // Once for each valid productId
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProduct({ productId: '456', isEagerLoading: false }),
    );
  });
});
