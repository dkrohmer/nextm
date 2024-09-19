import { renderHook } from '@testing-library/react-hooks';
import { Node, Graph } from '@antv/x6';
import useNodeAdded from '../../../../renderer/hooks/model-editor/useNodeAdded';
import Dataflow from '../../../../renderer/shapes/dataflow';

// Mock the Dataflow shape
jest.mock('../../../../renderer/shapes/dataflow', () => ({
  createEdge: jest.fn(),
}));

describe('useNodeAdded hook', () => {
  let mockGraph: Partial<Graph>;
  let mockDataflowNode: Partial<Node>;
  let mockNonDataflowNode: Partial<Node>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the Graph object and its on/off methods
    mockGraph = {
      on: jest.fn(),
      off: jest.fn(),
    } as Partial<Graph>;

    // Mock a Node object for dataflow-stencil
    mockDataflowNode = {
      id: 'dataflow-node-1',
      shape: 'dataflow-stencil',
      remove: jest.fn(),
    } as Partial<Node>;

    // Mock a Node object for non-dataflow-stencil shape
    mockNonDataflowNode = {
      id: 'non-dataflow-node-1',
      shape: 'non-dataflow-shape',  // Simulate a node with a different shape
      remove: jest.fn(),
    } as Partial<Node>;
  });

  it('should create an edge and remove the node if shape is "dataflow-stencil" and node is not processed', () => {
    // Render the hook
    renderHook(() => useNodeAdded(mockGraph as Graph));

    // Simulate the node:added event for the dataflow-stencil node
    const nodeAddedCallback = (mockGraph.on as jest.Mock).mock.calls[0][1];
    nodeAddedCallback({ node: mockDataflowNode as Node });

    // Ensure Dataflow.createEdge is called with the graph and node
    expect(Dataflow.createEdge).toHaveBeenCalledWith(mockGraph, mockDataflowNode);

    // Ensure the node is removed
    expect(mockDataflowNode.remove).toHaveBeenCalled();
  });

  it('should not create an edge for non "dataflow-stencil" nodes', () => {
    // Render the hook
    renderHook(() => useNodeAdded(mockGraph as Graph));

    // Simulate the node:added event for the non-dataflow-stencil node
    const nodeAddedCallback = (mockGraph.on as jest.Mock).mock.calls[0][1];
    nodeAddedCallback({ node: mockNonDataflowNode as Node });

    // Ensure Dataflow.createEdge is not called
    expect(Dataflow.createEdge).not.toHaveBeenCalled();

    // Ensure the node is not removed
    expect(mockNonDataflowNode.remove).not.toHaveBeenCalled();
  });

  it('should not create an edge if the node has already been processed', () => {
    // Render the hook
    const { result } = renderHook(() => useNodeAdded(mockGraph as Graph));

    // Simulate the node:added event twice with the same node
    const nodeAddedCallback = (mockGraph.on as jest.Mock).mock.calls[0][1];
    nodeAddedCallback({ node: mockDataflowNode as Node });  // First addition
    nodeAddedCallback({ node: mockDataflowNode as Node });  // Second addition

    // Ensure Dataflow.createEdge is only called once
    expect(Dataflow.createEdge).toHaveBeenCalledTimes(1);

    // Ensure the node.remove is called twice
    expect(mockDataflowNode.remove).toHaveBeenCalledTimes(2);
  });

  it('should remove the event listener on cleanup', () => {
    const { unmount } = renderHook(() => useNodeAdded(mockGraph as Graph));

    // Unmount the hook to trigger cleanup
    unmount();

    // Ensure the off method is called to remove the listener
    expect(mockGraph.off).toHaveBeenCalledWith('node:added', expect.any(Function));
  });

  it('should return early if graph is undefined', () => {
    // Render the hook without providing a graph (undefined)
    const { result } = renderHook(() => useNodeAdded(undefined));
  
    // Ensure the graph's on method is never called since the hook should return early
    expect(mockGraph.on).not.toHaveBeenCalled();
  
    // You can also check that no nodes are processed
    expect(result.current).toBeUndefined(); // No effect from the hook since graph is undefined
  });
  
});
