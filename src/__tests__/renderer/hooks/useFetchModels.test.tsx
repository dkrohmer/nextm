import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchModels } from '../../../renderer/services/api/models';
import useFetchModels from '../../../renderer/hooks/useFetchModels';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../../renderer/services/api/models', () => ({
  fetchModels: jest.fn(),
}));

function TestComponent() {
  useFetchModels();
  return null;
}

describe('useFetchModels', () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useParams as jest.Mock).mockReturnValue({ incrementId: '123' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchModels when incrementId is defined', () => {
    render(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchModels({ incrementId: '123' }),
    );
  });

  it('should not dispatch fetchModels if incrementId is undefined', () => {
    (useParams as jest.Mock).mockReturnValue({ incrementId: undefined });
    render(<TestComponent />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should not dispatch fetchModels if incrementId is an empty string', () => {
    (useParams as jest.Mock).mockReturnValue({ incrementId: '' });
    render(<TestComponent />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should dispatch fetchModels again if incrementId changes', () => {
    const { rerender } = render(<TestComponent />);

    (useParams as jest.Mock).mockReturnValue({ incrementId: '456' });
    rerender(<TestComponent />);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchModels({ incrementId: '456' }),
    );
  });
});
