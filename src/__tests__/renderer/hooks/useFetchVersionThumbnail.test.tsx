import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { fetchLatestVersionThumbnail } from '../../../renderer/services/api/versions';
import useFetchVersionThumbnail from '../../../renderer/hooks/useFetchVersionThumbnail';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../../../renderer/services/api/versions', () => ({
  fetchLatestVersionThumbnail: jest.fn(),
}));

function TestComponent({ modelId }: { modelId: string }) {
  useFetchVersionThumbnail(modelId);
  return null;
}

describe('useFetchVersionThumbnail', () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchLatestVersionThumbnail when modelId is defined', () => {
    render(<TestComponent modelId="model1" />);

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchLatestVersionThumbnail({ modelId: 'model1' }),
    );
  });

  it('should not dispatch fetchLatestVersionThumbnail if modelId is undefined', () => {
    render(<TestComponent modelId={undefined as unknown as string} />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should not dispatch fetchLatestVersionThumbnail if modelId is an empty string', () => {
    render(<TestComponent modelId="" />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should dispatch fetchLatestVersionThumbnail again if modelId changes', () => {
    const { rerender } = render(<TestComponent modelId="model1" />);

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchLatestVersionThumbnail({ modelId: 'model1' }),
    );

    rerender(<TestComponent modelId="model2" />);

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchLatestVersionThumbnail({ modelId: 'model2' }),
    );
  });
});
