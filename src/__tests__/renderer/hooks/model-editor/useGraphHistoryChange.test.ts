import { renderHook, act } from '@testing-library/react-hooks';
import { Graph } from '@antv/x6';
import { setCanRedo, setCanUndo } from '../../../../renderer/store/modelEditor';
import useGraphHistoryChange from '../../../../renderer/hooks/model-editor/useGraphHistoryChange';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('useGraphHistoryChange hook', () => {
  let mockGraph: Partial<Graph>;
  let historyChangeCallback: Function;

  beforeEach(() => {
    jest.clearAllMocks();

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
    renderHook(() => useGraphHistoryChange(undefined));

    expect(mockDispatch).toHaveBeenCalledWith(setCanRedo(false));
    expect(mockDispatch).toHaveBeenCalledWith(setCanUndo(false));
  });

  it('should register and handle history:change event when graph is provided', () => {
    renderHook(() => useGraphHistoryChange(mockGraph as Graph));

    act(() => {
      historyChangeCallback();
    });

    expect(mockGraph.canRedo).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(setCanRedo(true));

    expect(mockGraph.canUndo).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(setCanUndo(false));
  });

  it('should unregister history:change event on cleanup', () => {
    const { unmount } = renderHook(() =>
      useGraphHistoryChange(mockGraph as Graph),
    );

    unmount();

    expect(mockGraph.off).toHaveBeenCalledWith(
      'history:change',
      expect.any(Function),
    );
  });
});
