import { renderHook } from '@testing-library/react';
import { Graph } from '@antv/x6';
import useUpdateGrid from '../../../renderer/hooks/useUpdateGrid';

const mockHideGrid = jest.fn();
const mockShowGrid = jest.fn();
const mockDrawGrid = jest.fn();

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
    renderHook(() => useUpdateGrid(mockGraph, 'none'));

    expect(mockHideGrid).toHaveBeenCalled();
    expect(mockShowGrid).not.toHaveBeenCalled();
    expect(mockDrawGrid).not.toHaveBeenCalled();
  });

  it('should show and draw the grid if graph is defined and gridVisible is not "none"', () => {
    renderHook(() => useUpdateGrid(mockGraph, 'dot'));

    expect(mockHideGrid).toHaveBeenCalled();
    expect(mockShowGrid).toHaveBeenCalled();
    expect(mockDrawGrid).toHaveBeenCalledWith({ type: 'dot' });
  });

  it('should not do anything if graph is undefined', () => {
    renderHook(() => useUpdateGrid(undefined, 'dot'));

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

    expect(mockHideGrid).toHaveBeenCalled();
    expect(mockShowGrid).toHaveBeenCalled();
    expect(mockDrawGrid).toHaveBeenCalledWith({ type: 'dot' });

    rerender({ graph: mockGraph, gridVisible: 'mesh' });

    expect(mockDrawGrid).toHaveBeenCalledWith({ type: 'mesh' });
  });
});
