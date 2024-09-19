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

    // Mock the Graph object
    mockGraph = {
      on: jest.fn((event: string, callback: Function) => {
        if (event === 'node:change:parent') nodeEmbedCallback = callback;
      }),
      off: jest.fn(),
    } as unknown as Graph;

    // Mock the Parent Cell object
    mockParent = {
      getZIndex: jest.fn(() => 10),
      setZIndex: jest.fn(),
    } as unknown as jest.Mocked<Cell>;

    // Mock the Child Cell object
    mockChildCell = {
      getZIndex: jest.fn(() => 5),
      setZIndex: jest.fn(),
      getChildren: jest.fn(),
    } as unknown as jest.Mocked<Cell>;

    // Mock the main Cell object (which will have children)
    mockCell = {
      getChildren: jest.fn(() => [mockChildCell]), // return child cell
      hasParent: jest.fn(() => true),
      getParent: jest.fn(() => mockParent),
      getZIndex: jest.fn(() => 10),
      setZIndex: jest.fn(),
    } as unknown as jest.Mocked<Cell>;
  });

  it('should return early if graph is undefined', () => {
    // Call the hook without a graph
    renderHook(() => useNodeEmbed(undefined));

    // Ensure that no event listeners are added
    expect(mockGraph.on).not.toHaveBeenCalled();
  });

  it('should handle node embedding and update z-index of the node and its children', () => {
    // Call the hook with the mock graph
    renderHook(() => useNodeEmbed(mockGraph));

    // Simulate the event being triggered
    nodeEmbedCallback({ cell: mockCell });

    // Verify that the z-index is updated correctly for the parent
    expect(mockCell.setZIndex).toHaveBeenCalledWith(11); // parentZIndex + 1
    expect(mockCell.getParent).toHaveBeenCalled();

    // Verify that the z-index is updated correctly for the child
    expect(mockChildCell.setZIndex).toHaveBeenCalledWith(12); // child zIndex set to parent + 2
  });

  it('should clean up the event listener on unmount', () => {
    const { unmount } = renderHook(() => useNodeEmbed(mockGraph));

    // Unmount the hook
    unmount();

    // Ensure the event listener is removed
    expect(mockGraph.off).toHaveBeenCalledWith('node:change:parent', expect.any(Function));
  });

  it('should update z-index of parent and children when node is embedded', () => {
    // Call the hook with the mock graph
    renderHook(() => useNodeEmbed(mockGraph));

    // Simulate the event being triggered
    nodeEmbedCallback({ cell: mockCell });

    // Verify that the z-index is updated correctly for the parent
    expect(mockCell.setZIndex).toHaveBeenCalledWith(11); // parentZIndex + 1

    // Verify that the z-index is updated correctly for the child
    expect(mockChildCell.setZIndex).toHaveBeenCalledWith(12); // child zIndex set to parent + 2
  });

  it('should fallback to z-index 0 when parent.getZIndex() returns undefined', () => {
    // Mock getZIndex to return undefined
    mockParent.getZIndex.mockReturnValue(undefined);
  
    // Call the hook with the mock graph
    renderHook(() => useNodeEmbed(mockGraph));
  
    // Simulate the event being triggered
    nodeEmbedCallback({ cell: mockCell });
  
    // Verify that the z-index is updated correctly with the fallback
    expect(mockCell.setZIndex).toHaveBeenCalledWith(1); // parentZIndex is 0, so new zIndex should be 0 + 1
  
    // Verify that the z-index for the child is updated correctly
    expect(mockChildCell.setZIndex).toHaveBeenCalledWith(2); // child zIndex set to parent + 2
  });
});
