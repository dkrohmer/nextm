import { renderHook } from '@testing-library/react-hooks';
import { Graph, Cell } from '@antv/x6';
import useNodeEmbed from '../../../../renderer/hooks/model-editor/useNodeEmbed';

describe('useNodeEmbed hook', () => {
  let mockGraph: Graph;
  let mockCell: jest.Mocked<Cell>;
  let mockParent: jest.Mocked<Cell>;
  let mockChildCell: jest.Mocked<Cell>;
  let nodeEmbedCallback: Function;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGraph = {
      on: jest.fn((event: string, callback: Function) => {
        if (event === 'node:change:parent') nodeEmbedCallback = callback;
      }),
      off: jest.fn(),
    } as unknown as Graph;

    mockParent = {
      getZIndex: jest.fn(() => 10),
      setZIndex: jest.fn(),
    } as unknown as jest.Mocked<Cell>;

    mockChildCell = {
      getZIndex: jest.fn(() => 5),
      setZIndex: jest.fn(),
      getChildren: jest.fn(),
    } as unknown as jest.Mocked<Cell>;

    mockCell = {
      getChildren: jest.fn(() => [mockChildCell]),
      hasParent: jest.fn(() => true),
      getParent: jest.fn(() => mockParent),
      getZIndex: jest.fn(() => 10),
      setZIndex: jest.fn(),
    } as unknown as jest.Mocked<Cell>;
  });

  it('should return early if graph is undefined', () => {
    renderHook(() => useNodeEmbed(undefined));

    expect(mockGraph.on).not.toHaveBeenCalled();
  });

  it('should handle node embedding and update z-index of the node and its children', () => {
    renderHook(() => useNodeEmbed(mockGraph));

    nodeEmbedCallback({ cell: mockCell });

    expect(mockCell.setZIndex).toHaveBeenCalledWith(11);
    expect(mockCell.getParent).toHaveBeenCalled();
    expect(mockChildCell.setZIndex).toHaveBeenCalledWith(12);
  });

  it('should clean up the event listener on unmount', () => {
    const { unmount } = renderHook(() => useNodeEmbed(mockGraph));

    unmount();

    expect(mockGraph.off).toHaveBeenCalledWith(
      'node:change:parent',
      expect.any(Function),
    );
  });

  it('should update z-index of parent and children when node is embedded', () => {
    renderHook(() => useNodeEmbed(mockGraph));

    nodeEmbedCallback({ cell: mockCell });

    expect(mockCell.setZIndex).toHaveBeenCalledWith(11);
    expect(mockChildCell.setZIndex).toHaveBeenCalledWith(12);
  });

  it('should fallback to z-index 0 when parent.getZIndex() returns undefined', () => {
    mockParent.getZIndex.mockReturnValue(undefined);

    renderHook(() => useNodeEmbed(mockGraph));

    nodeEmbedCallback({ cell: mockCell });

    expect(mockCell.setZIndex).toHaveBeenCalledWith(1);
    expect(mockChildCell.setZIndex).toHaveBeenCalledWith(2);
  });

  it('should bring the selected node to the front when it is not a "zone"', () => {
    const mockCells = [
      { getZIndex: jest.fn(() => 5) } as unknown as Cell,
      { getZIndex: jest.fn(() => 10) } as unknown as Cell,
      { getZIndex: jest.fn(() => 3) } as unknown as Cell,
    ];

    mockGraph.getCells = jest.fn(() => mockCells);

    mockCell = {
      ...mockCell,
      shape: 'rect',
    } as jest.Mocked<Cell>;

    mockCell.setZIndex = jest.fn();

    renderHook(() => useNodeEmbed(mockGraph));

    const nodeSelectCallback = (mockGraph.on as jest.Mock).mock.calls.find(
      (call) => call[0] === 'node:selected',
    )[1];
    nodeSelectCallback({ cell: mockCell });

    expect(mockCell.setZIndex).toHaveBeenCalledWith(11);
  });

  it('should not update the z-index if the selected node is a "zone"', () => {
    mockCell = {
      ...mockCell,
      shape: 'zone',
    } as jest.Mocked<Cell>;

    mockCell.setZIndex = jest.fn();

    renderHook(() => useNodeEmbed(mockGraph));

    const nodeSelectCallback = (mockGraph.on as jest.Mock).mock.calls.find(
      (call) => call[0] === 'node:selected',
    )[1];
    nodeSelectCallback({ cell: mockCell });

    expect(mockCell.setZIndex).not.toHaveBeenCalled();
  });

  it('should handle nodes without z-index (undefined z-index) and bring selected node to the front', () => {
    const mockCells = [
      { getZIndex: jest.fn(() => 5) } as unknown as Cell,
      { getZIndex: jest.fn(() => undefined) } as unknown as Cell,
      { getZIndex: jest.fn(() => 3) } as unknown as Cell,
    ];

    mockGraph.getCells = jest.fn(() => mockCells);

    mockCell = {
      ...mockCell,
      shape: 'rect',
    } as jest.Mocked<Cell>;

    mockCell.setZIndex = jest.fn();

    renderHook(() => useNodeEmbed(mockGraph));

    const nodeSelectCallback = (mockGraph.on as jest.Mock).mock.calls.find(
      (call) => call[0] === 'node:selected',
    )[1];
    nodeSelectCallback({ cell: mockCell });

    expect(mockCell.setZIndex).toHaveBeenCalledWith(6);
  });
});
