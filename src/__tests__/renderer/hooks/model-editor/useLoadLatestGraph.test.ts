import { renderHook } from '@testing-library/react-hooks';
import { Graph } from '@antv/x6';
import useLoadLatestGraph from '../../../../renderer/hooks/model-editor/useLoadLatestGraph';

// Mock useSelector
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('useLoadLatestGraph hook', () => {
  let mockGraph: Partial<Graph>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the Graph object
    mockGraph = {
      fromJSON: jest.fn(),
      zoomToRect: jest.fn(),
      zoomToFit: jest.fn(),
    };
  });

  it('should load the latest version into the graph when available', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        versions: {
          latestVersion: {
            payload: {
              cells: { id: 'cell1', type: 'node' },
            },
          },
        },
      }),
    );

    const { result } = renderHook(() => useLoadLatestGraph(mockGraph as Graph));

    // Ensure the graph is loaded with the cells from the latest version
    expect(mockGraph.fromJSON).toHaveBeenCalledWith({
      id: 'cell1',
      type: 'node',
    });
  });

  it('should zoom to the latest version’s dimensions if available on first load', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        versions: {
          latestVersion: {
            payload: {
              cells: { id: 'cell1', type: 'node' },
            },
            x: 100,
            y: 100,
            height: 500,
            width: 500,
          },
        },
      }),
    );

    const { result } = renderHook(() => useLoadLatestGraph(mockGraph as Graph));

    // Ensure the graph zooms to the rect provided by the latest version
    expect(mockGraph.zoomToRect).toHaveBeenCalledWith({
      x: 100,
      y: 100,
      height: 500,
      width: 500,
    });
  });

  it('should zoom to fit if dimensions are missing on first load', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        versions: {
          latestVersion: {
            payload: {
              cells: { id: 'cell1', type: 'node' },
            },
            x: null,
            y: null,
            height: null,
            width: null,
          },
        },
      }),
    );

    const { result } = renderHook(() => useLoadLatestGraph(mockGraph as Graph));

    // Ensure the graph zooms to fit since no dimensions are provided
    expect(mockGraph.zoomToFit).toHaveBeenCalledWith({
      padding: { left: 200, right: 200 },
    });
  });

  it('should not do anything if graph or latestVersion is missing', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        versions: { latestVersion: null },
      }),
    );

    const { result } = renderHook(() => useLoadLatestGraph(undefined));

    // Ensure that graph methods are not called since no graph is provided
    expect(mockGraph.fromJSON).not.toHaveBeenCalled();
    expect(mockGraph.zoomToRect).not.toHaveBeenCalled();
    expect(mockGraph.zoomToFit).not.toHaveBeenCalled();
  });
});
