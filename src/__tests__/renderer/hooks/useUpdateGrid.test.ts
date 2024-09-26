import { renderHook } from '@testing-library/react';
import { Graph } from '@antv/x6';
import useUpdateGrid from '../../../renderer/hooks/useUpdateGrid';

// Mock Graph instance methods
const mockHideGrid = jest.fn();
const mockShowGrid = jest.fn();
const mockDrawGrid = jest.fn();

// Mock Graph instance
const mockGraph = {
  hideGrid: mockHideGrid,
  showGrid: mockShowGrid,
  drawGrid: mockDrawGrid,
} as unknown as Graph;

describe('useUpdateGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should hide the grid if graph is defined and gridVisible is "none"', () => {
    // Render the hook with gridVisible as 'none'
    renderHook(() => useUpdateGrid(mockGraph, 'none'));

    // Ensure hideGrid is called and showGrid/drawGrid are not called
    expect(mockHideGrid).toHaveBeenCalled();
    expect(mockShowGrid).not.toHaveBeenCalled();
    expect(mockDrawGrid).not.toHaveBeenCalled();
  });

  it('should show and draw the grid if graph is defined and gridVisible is not "none"', () => {
    // Render the hook with gridVisible as 'dot'
    renderHook(() => useUpdateGrid(mockGraph, 'dot'));

    // Ensure hideGrid, showGrid, and drawGrid are called correctly
    expect(mockHideGrid).toHaveBeenCalled();
    expect(mockShowGrid).toHaveBeenCalled();
    expect(mockDrawGrid).toHaveBeenCalledWith({ type: 'dot' });
  });

  it('should not do anything if graph is undefined', () => {
    // Render the hook with undefined graph
    renderHook(() => useUpdateGrid(undefined, 'dot'));

    // Ensure none of the graph methods are called
    expect(mockHideGrid).not.toHaveBeenCalled();
    expect(mockShowGrid).not.toHaveBeenCalled();
    expect(mockDrawGrid).not.toHaveBeenCalled();
  });

  it('should update the grid when gridVisible changes', () => {
    const { rerender } = renderHook(
      ({ graph, gridVisible }) => useUpdateGrid(graph, gridVisible),
      {
        initialProps: { graph: mockGraph, gridVisible: 'dot' },
      },
    );

    // Initially, the grid should be drawn with the 'dot' type
    expect(mockHideGrid).toHaveBeenCalled();
    expect(mockShowGrid).toHaveBeenCalled();
    expect(mockDrawGrid).toHaveBeenCalledWith({ type: 'dot' });

    // Change gridVisible to 'mesh'
    rerender({ graph: mockGraph, gridVisible: 'mesh' });

    // Ensure the grid is updated with the new 'mesh' type
    expect(mockDrawGrid).toHaveBeenCalledWith({ type: 'mesh' });
  });
});
