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
    // Create mock versions of the graph and cells
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

    // Mock the behavior of the on method to capture callbacks
    (mockGraph.on as jest.Mock).mockImplementation(
      (event: string, callback: Function) => {
        if (event === 'cell:mouseenter') hoverCallback = callback;
        if (event === 'cell:mouseleave') unhoverCallback = callback;
      },
    );
  });

  it('should register hover and unhover events on mount and unregister them on unmount', () => {
    const { unmount } = renderHook(() => useHoverCells(mockGraph));

    // Verify that hover and unhover events are registered
    expect(mockGraph.on).toHaveBeenCalledWith(
      'cell:mouseenter',
      expect.any(Function),
    );
    expect(mockGraph.on).toHaveBeenCalledWith(
      'cell:mouseleave',
      expect.any(Function),
    );

    // Simulate unmount
    unmount();

    // Verify that hover and unhover events are unregistered
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

    // Simulate hover event over a node
    act(() => {
      hoverCallback({ cell: mockNodeCell as unknown as Cell });
    });

    // Verify that strokeWidth is set to 3 for the node
    expect(mockNodeCell.attr).toHaveBeenCalledWith('body/strokeWidth', 3);
  });

  it('should set strokeWidth to 3 when hovering over an edge', () => {
    renderHook(() => useHoverCells(mockGraph));

    // Simulate hover event over an edge
    act(() => {
      hoverCallback({ cell: mockEdgeCell as unknown as Cell });
    });

    // Verify that strokeWidth is set to 3 for the edge
    expect(mockEdgeCell.attr).toHaveBeenCalledWith('line/strokeWidth', 3);
  });

  it('should reset strokeWidth to 1 when unhovering a node', () => {
    renderHook(() => useHoverCells(mockGraph));

    // Simulate unhover event over a node
    act(() => {
      unhoverCallback({ cell: mockNodeCell as unknown as Cell });
    });

    // Verify that strokeWidth is reset to 1 for the node
    expect(mockNodeCell.attr).toHaveBeenCalledWith('body/strokeWidth', 1);
  });

  it('should reset strokeWidth to 1 when unhovering an edge', () => {
    renderHook(() => useHoverCells(mockGraph));

    // Simulate unhover event over an edge
    act(() => {
      unhoverCallback({ cell: mockEdgeCell as unknown as Cell });
    });

    // Verify that strokeWidth is reset to 1 for the edge
    expect(mockEdgeCell.attr).toHaveBeenCalledWith('line/strokeWidth', 1);
  });

  it('should not register any events if graph is not provided', () => {
    renderHook(() => useHoverCells(undefined));

    // Verify that no events are registered
    expect(mockGraph.on).not.toHaveBeenCalled();
    expect(mockGraph.off).not.toHaveBeenCalled();
  });
});
