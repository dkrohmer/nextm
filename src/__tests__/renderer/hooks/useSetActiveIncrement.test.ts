import { renderHook } from '@testing-library/react';
import { setIncrementsActiveIndex } from '../../../renderer/store/increments';
import useSetActiveIncrement from '../../../renderer/hooks/useSetActiveIncrement';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('useSetActiveIncrement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch setIncrementsActiveIndex with the correct index when incrementId is found', () => {
    const increments = [{ id: 'inc1' }, { id: 'inc2' }, { id: 'inc3' }];

    renderHook(() =>
      useSetActiveIncrement(true, increments, 'inc2'),
    );

    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsActiveIndex(1));
  });

  it('should dispatch setIncrementsActiveIndex with -1 when incrementId is not provided', () => {
    const increments = [{ id: 'inc1' }, { id: 'inc2' }, { id: 'inc3' }];

    renderHook(() =>
      useSetActiveIncrement(true, increments, undefined),
    );

    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsActiveIndex(-1));
  });

  it('should not dispatch any action when incrementsIsLoaded is false', () => {
    const increments = [{ id: 'inc1' }, { id: 'inc2' }, { id: 'inc3' }];

    renderHook(() =>
      useSetActiveIncrement(false, increments, 'inc2'),
    );

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should not dispatch any action when increments array is empty', () => {
    renderHook(() => useSetActiveIncrement(true, [], 'inc2'));

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
