import { renderHook, act } from '@testing-library/react-hooks';
import { Cell, Graph } from '@antv/x6';
import useHoverCells from '../../../../renderer/hooks/model-editor/useHoverCells';

describe('useHoverCells hook', () => {
  let mockGraph: Graph;
  let mockNodeCell: Partial<Cell>;
  let mockEdgeCell: Partial<Cell>;
  let hoverCallback: Function;
  let unhoverCallback: Function;

  beforeEach(() => {
    mockGraph = {
      on: jest.fn(),
      off: jest.fn(),
    } as unknown as Graph;

    mockNodeCell = {
      isNode: jest.fn(() => true),
      isEdge: jest.fn(() => false),
      attr: jest.fn(),
    } as unknown as Cell;

    mockEdgeCell = {
      isNode: jest.fn(() => false),
      isEdge: jest.fn(() => true),
      attr: jest.fn(),
    } as unknown as Cell;

    (mockGraph.on as jest.Mock).mockImplementation(
      (event: string, callback: Function) => {
        if (event === 'cell:mouseenter') hoverCallback = callback;
        if (event === 'cell:mouseleave') unhoverCallback = callback;
      },
    );
  });

  it('should register hover and unhover events on mount and unregister them on unmount', () => {
    const { unmount } = renderHook(() => useHoverCells(mockGraph));

    expect(mockGraph.on).toHaveBeenCalledWith(
      'cell:mouseenter',
      expect.any(Function),
    );
    expect(mockGraph.on).toHaveBeenCalledWith(
      'cell:mouseleave',
      expect.any(Function),
    );

    unmount();

    expect(mockGraph.off).toHaveBeenCalledWith(
      'cell:mouseenter',
      expect.any(Function),
    );
    expect(mockGraph.off).toHaveBeenCalledWith(
      'cell:mouseleave',
      expect.any(Function),
    );
  });

  it('should set strokeWidth to 3 when hovering over a node', () => {
    renderHook(() => useHoverCells(mockGraph));

    act(() => {
      hoverCallback({ cell: mockNodeCell as unknown as Cell });
    });

    expect(mockNodeCell.attr).toHaveBeenCalledWith('body/strokeWidth', 3);
  });

  it('should set strokeWidth to 3 when hovering over an edge', () => {
    renderHook(() => useHoverCells(mockGraph));

    act(() => {
      hoverCallback({ cell: mockEdgeCell as unknown as Cell });
    });

    expect(mockEdgeCell.attr).toHaveBeenCalledWith('line/strokeWidth', 3);
  });

  it('should reset strokeWidth to 1 when unhovering a node', () => {
    renderHook(() => useHoverCells(mockGraph));

    act(() => {
      unhoverCallback({ cell: mockNodeCell as unknown as Cell });
    });

    expect(mockNodeCell.attr).toHaveBeenCalledWith('body/strokeWidth', 1);
  });

  it('should reset strokeWidth to 1 when unhovering an edge', () => {
    renderHook(() => useHoverCells(mockGraph));

    act(() => {
      unhoverCallback({ cell: mockEdgeCell as unknown as Cell });
    });

    expect(mockEdgeCell.attr).toHaveBeenCalledWith('line/strokeWidth', 1);
  });

  it('should not register any events if graph is not provided', () => {
    renderHook(() => useHoverCells(undefined));

    expect(mockGraph.on).not.toHaveBeenCalled();
    expect(mockGraph.off).not.toHaveBeenCalled();
  });
});
