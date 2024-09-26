import { renderHook } from '@testing-library/react-hooks';
import { Node, Graph } from '@antv/x6';
import useNodeAdded from '../../../../renderer/hooks/model-editor/useNodeAdded';
import Dataflow from '../../../../renderer/shapes/dataflow';

jest.mock('../../../../renderer/shapes/dataflow', () => ({
  createEdge: jest.fn(),
}));

describe('useNodeAdded hook', () => {
  let mockGraph: Partial<Graph>;
  let mockDataflowNode: Partial<Node>;
  let mockNonDataflowNode: Partial<Node>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGraph = {
      on: jest.fn(),
      off: jest.fn(),
    } as Partial<Graph>;

    mockDataflowNode = {
      id: 'dataflow-node-1',
      shape: 'dataflow-stencil',
      remove: jest.fn(),
    } as Partial<Node>;

    mockNonDataflowNode = {
      id: 'non-dataflow-node-1',
      shape: 'non-dataflow-shape',
      remove: jest.fn(),
    } as Partial<Node>;
  });

  it('should create an edge and remove the node if shape is "dataflow-stencil" and node is not processed', () => {
    renderHook(() => useNodeAdded(mockGraph as Graph));

    const nodeAddedCallback = (mockGraph.on as jest.Mock).mock.calls[0][1];
    nodeAddedCallback({ node: mockDataflowNode as Node });

    expect(Dataflow.createEdge).toHaveBeenCalledWith(
      mockGraph,
      mockDataflowNode,
    );
    expect(mockDataflowNode.remove).toHaveBeenCalled();
  });

  it('should not create an edge for non "dataflow-stencil" nodes', () => {
    renderHook(() => useNodeAdded(mockGraph as Graph));

    const nodeAddedCallback = (mockGraph.on as jest.Mock).mock.calls[0][1];
    nodeAddedCallback({ node: mockNonDataflowNode as Node });

    expect(Dataflow.createEdge).not.toHaveBeenCalled();
    expect(mockNonDataflowNode.remove).not.toHaveBeenCalled();
  });

  it('should not create an edge if the node has already been processed', () => {
    renderHook(() => useNodeAdded(mockGraph as Graph));
  
    expect(mockGraph.on).toHaveBeenCalledWith('node:added', expect.any(Function));
  
    const nodeAddedCallback = (mockGraph.on as jest.Mock).mock.calls[0][1];
    nodeAddedCallback({ node: mockDataflowNode as Node });
    nodeAddedCallback({ node: mockDataflowNode as Node });
  
    expect(Dataflow.createEdge).toHaveBeenCalledTimes(1);
    expect(mockDataflowNode.remove).toHaveBeenCalledTimes(2);
  });
  

  it('should remove the event listener on cleanup', () => {
    const { unmount } = renderHook(() => useNodeAdded(mockGraph as Graph));

    unmount();

    expect(mockGraph.off).toHaveBeenCalledWith(
      'node:added',
      expect.any(Function),
    );
  });

  it('should return early if graph is undefined', () => {
    const { result } = renderHook(() => useNodeAdded(undefined));

    expect(mockGraph.on).not.toHaveBeenCalled();
    expect(result.current).toBeUndefined();
  });
});
