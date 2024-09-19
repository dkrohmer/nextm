import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import { Graph } from '@antv/x6';
import useGraphHistoryChange from '../../../../renderer/hooks/model-editor/useGraphHistoryChange';
import { setCanRedo, setCanUndo } from '../../../../renderer/store/modelEditor';

// Mock useDispatch hook
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('useGraphHistoryChange hook', () => {
  let mockGraph: Partial<Graph>;
  let historyChangeCallback: Function;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Graph object with canRedo, canUndo, and on/off methods
    mockGraph = {
      canRedo: jest.fn(() => true),
      canUndo: jest.fn(() => false),
      on: jest.fn((event: string, callback: Function) => {
        if (event === 'history:change') {
          historyChangeCallback = callback;
        }
      }),
      off: jest.fn(),
    } as unknown as Partial<Graph>;
  });

  it('should set canRedo and canUndo to false if no graph is provided', () => {
    // Render the hook without a graph
    renderHook(() => useGraphHistoryChange(undefined));

    // Expect setCanRedo and setCanUndo to be dispatched with false
    expect(mockDispatch).toHaveBeenCalledWith(setCanRedo(false));
    expect(mockDispatch).toHaveBeenCalledWith(setCanUndo(false));
  });

  it('should register and handle history:change event when graph is provided', () => {
    // Render the hook with a graph
    renderHook(() => useGraphHistoryChange(mockGraph as Graph));

    // Simulate history:change event
    act(() => {
      historyChangeCallback();
    });

    // Expect setCanRedo and setCanUndo to be dispatched with the values returned by graph
    expect(mockGraph.canRedo).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(setCanRedo(true));

    expect(mockGraph.canUndo).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(setCanUndo(false));
  });

  it('should unregister history:change event on cleanup', () => {
    // Render the hook with a graph
    const { unmount } = renderHook(() => useGraphHistoryChange(mockGraph as Graph));

    // Unmount the hook (trigger cleanup)
    unmount();

    // Expect the history:change event to be unregistered
    expect(mockGraph.off).toHaveBeenCalledWith('history:change', expect.any(Function));
  });
});
