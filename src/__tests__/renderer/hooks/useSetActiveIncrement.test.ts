// src/__tests__/renderer/hooks/useSetActiveIncrement.test.tsx

import { renderHook } from '@testing-library/react';
import useSetActiveIncrement from '../../../renderer/hooks/useSetActiveIncrement';
import { setIncrementsActiveIndex } from '../../../renderer/store/increments';

// Mock useDispatch
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

    // Render the hook
    renderHook(() =>
      useSetActiveIncrement(true, increments, 'inc2'),
    );

    // Ensure the correct index is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsActiveIndex(1)); // Index of 'inc2' in the increments array
  });

  it('should dispatch setIncrementsActiveIndex with -1 when incrementId is not provided', () => {
    const increments = [{ id: 'inc1' }, { id: 'inc2' }, { id: 'inc3' }];

    // Render the hook with no incrementId
    renderHook(() =>
      useSetActiveIncrement(true, increments, undefined),
    );

    // Ensure -1 is dispatched since there is no incrementId
    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsActiveIndex(-1));
  });

  it('should not dispatch any action when incrementsIsLoaded is false', () => {
    const increments = [{ id: 'inc1' }, { id: 'inc2' }, { id: 'inc3' }];

    // Render the hook with incrementsIsLoaded as false
    renderHook(() =>
      useSetActiveIncrement(false, increments, 'inc2'),
    );

    // Ensure that no action is dispatched since incrementsIsLoaded is false
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should not dispatch any action when increments array is empty', () => {
    // Render the hook with an empty increments array
    renderHook(() => useSetActiveIncrement(true, [], 'inc2'));

    // Ensure that no action is dispatched since the increments array is empty
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
