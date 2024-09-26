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

  it('should bring the selected node to the front when it is not a "zone"', () => {
    // Mock the Graph to return multiple cells with different z-indexes
    const mockCells = [
      { getZIndex: jest.fn(() => 5) } as unknown as Cell,
      { getZIndex: jest.fn(() => 10) } as unknown as Cell,
      { getZIndex: jest.fn(() => 3) } as unknown as Cell,
    ];
  
    mockGraph.getCells = jest.fn(() => mockCells);
  
    // Mock the selected Cell object (not a "zone" shape)
    mockCell = {
      ...mockCell,
      shape: 'rect', // Example shape other than 'zone'
    } as jest.Mocked<Cell>;
    
    mockCell.setZIndex = jest.fn();
  
    // Call the hook with the mock graph
    renderHook(() => useNodeEmbed(mockGraph));
  
    // Simulate the 'node:selected' event
    const nodeSelectCallback = (mockGraph.on as jest.Mock).mock.calls.find(call => call[0] === 'node:selected')[1];
    nodeSelectCallback({ cell: mockCell });
  
    // Verify that the z-index is updated to be higher than the current highest z-index (which is 10 in mockCells)
    expect(mockCell.setZIndex).toHaveBeenCalledWith(11);
  });
  
  it('should not update the z-index if the selected node is a "zone"', () => {
    // Mock the selected Cell object with shape 'zone'
    mockCell = {
      ...mockCell,
      shape: 'zone',
    } as jest.Mocked<Cell>;
    
    mockCell.setZIndex = jest.fn();
  
    // Call the hook with the mock graph
    renderHook(() => useNodeEmbed(mockGraph));
  
    // Simulate the 'node:selected' event
    const nodeSelectCallback = (mockGraph.on as jest.Mock).mock.calls.find(call => call[0] === 'node:selected')[1];
    nodeSelectCallback({ cell: mockCell });
  
    // Verify that setZIndex is not called since the shape is 'zone'
    expect(mockCell.setZIndex).not.toHaveBeenCalled();
  });

  it('should handle nodes without z-index (undefined z-index) and bring selected node to the front', () => {
    // Mock the Graph to return multiple cells, some with undefined z-index
    const mockCells = [
      { getZIndex: jest.fn(() => 5) } as unknown as Cell,
      { getZIndex: jest.fn(() => undefined) } as unknown as Cell, // This will trigger the `|| 0` fallback
      { getZIndex: jest.fn(() => 3) } as unknown as Cell,
    ];
  
    mockGraph.getCells = jest.fn(() => mockCells);
  
    // Mock the selected Cell object (not a "zone" shape)
    mockCell = {
      ...mockCell,
      shape: 'rect', // Example shape other than 'zone'
    } as jest.Mocked<Cell>;
    
    mockCell.setZIndex = jest.fn();
  
    // Call the hook with the mock graph
    renderHook(() => useNodeEmbed(mockGraph));
  
    // Simulate the 'node:selected' event
    const nodeSelectCallback = (mockGraph.on as jest.Mock).mock.calls.find(call => call[0] === 'node:selected')[1];
    nodeSelectCallback({ cell: mockCell });
  
    // Verify that the z-index is updated to be higher than the current highest z-index (which is 5 in this case)
    expect(mockCell.setZIndex).toHaveBeenCalledWith(6);
  });
});
