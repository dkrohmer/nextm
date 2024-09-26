// src/__tests__/renderer/hooks/useDefaultDatabase.test.ts

import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useDefaultDatabase from '../../../renderer/hooks/useDefaultDatabase';
import { fetchProduct } from '../../../renderer/services/api/products';
import { fetchIncrements } from '../../../renderer/services/api/increments';
import { setIncrementsActiveIndex } from '../../../renderer/store/increments';

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

jest.mock('../../../renderer/services/api/increments', () => ({
  fetchIncrements: jest.fn(),
}));

jest.mock('../../../renderer/store/increments', () => ({
  setIncrementsActiveIndex: jest.fn(),
}));

// Helper component to test the hook
function TestComponent() {
  useDefaultDatabase();
  return null;
}

describe('useDefaultDatabase', () => {
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

  it('should dispatch setIncrementsActiveIndex, fetchProduct, and fetchIncrements when productId is defined', () => {
    render(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledWith(setIncrementsActiveIndex(-1));
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProduct({ productId: '123', isEagerLoading: false }),
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchIncrements({ productId: '123' }),
    );
  });

  it('should not dispatch actions if productId is undefined', () => {
    (useParams as jest.Mock).mockReturnValue({ productId: undefined });
    render(<TestComponent />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
