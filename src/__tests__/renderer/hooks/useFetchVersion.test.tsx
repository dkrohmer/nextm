import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../../renderer/services/api/products';
import { fetchIncrement } from '../../../renderer/services/api/increments';
import { fetchModel } from '../../../renderer/services/api/models';
import { fetchLatestVersion } from '../../../renderer/services/api/versions';
import useFetchVersion from '../../../renderer/hooks/useFetchVersion';

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
  fetchIncrement: jest.fn(),
}));

jest.mock('../../../renderer/services/api/models', () => ({
  fetchModel: jest.fn(),
}));

jest.mock('../../../renderer/services/api/versions', () => ({
  fetchLatestVersion: jest.fn(),
}));

function TestComponent() {
  useFetchVersion();
  return null;
}

describe('useFetchVersion', () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);

    (useParams as jest.Mock).mockReturnValue({
      productId: 'product1',
      incrementId: 'increment1',
      modelId: 'model1',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchProduct, fetchIncrement, fetchModel, and fetchLatestVersion when productId, incrementId, and modelId are defined', () => {
    render(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProduct({ productId: 'product1', isEagerLoading: false }),
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchIncrement({ incrementId: 'increment1', isEagerLoading: false }),
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchModel({ modelId: 'model1', isEagerLoading: false }),
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchLatestVersion({ modelId: 'model1' }),
    );
  });

  it('should not dispatch any actions if productId is undefined', () => {
    (useParams as jest.Mock).mockReturnValue({
      productId: undefined,
      incrementId: 'increment1',
      modelId: 'model1',
    });
    render(<TestComponent />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should not dispatch any actions if incrementId is undefined', () => {
    (useParams as jest.Mock).mockReturnValue({
      productId: 'product1',
      incrementId: undefined,
      modelId: 'model1',
    });
    render(<TestComponent />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should not dispatch any actions if modelId is undefined', () => {
    (useParams as jest.Mock).mockReturnValue({
      productId: 'product1',
      incrementId: 'increment1',
      modelId: undefined,
    });
    render(<TestComponent />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should dispatch actions again if productId, incrementId, or modelId changes', () => {
    const { rerender } = render(<TestComponent />);

    (useParams as jest.Mock).mockReturnValue({
      productId: 'product2',
      incrementId: 'increment2',
      modelId: 'model2',
    });
    rerender(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledTimes(8);

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchProduct({ productId: 'product2', isEagerLoading: false }),
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchIncrement({ incrementId: 'increment2', isEagerLoading: false }),
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchModel({ modelId: 'model2', isEagerLoading: false }),
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchLatestVersion({ modelId: 'model2' }),
    );
  });
});
