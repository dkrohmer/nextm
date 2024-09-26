import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../../renderer/services/api/products';
import { fetchIncrements } from '../../../renderer/services/api/increments';
import { setIncrementsActiveIndex } from '../../../renderer/store/increments';
import useFetchProductAndIncrements from '../../../renderer/hooks/useFetchIncrements';

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

function TestComponent() {
  useFetchProductAndIncrements();
  return null;
}

describe('useFetchProductAndIncrements', () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
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

  it('should not dispatch actions if productId is empty string', () => {
    (useParams as jest.Mock).mockReturnValue({ productId: '' });
    render(<TestComponent />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should dispatch actions again if productId changes', () => {
    const { rerender } = render(<TestComponent />);

    (useParams as jest.Mock).mockReturnValue({ productId: '456' });
    rerender(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledTimes(6);
    expect(dispatchMock).toHaveBeenCalledWith(setIncrementsActiveIndex(-1));
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProduct({ productId: '456', isEagerLoading: false }),
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchIncrements({ productId: '456' }),
    );
  });
});
