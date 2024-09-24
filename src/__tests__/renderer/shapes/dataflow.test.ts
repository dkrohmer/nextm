import { Graph, Node } from '@antv/x6';
import dataflow from '../../../renderer/shapes/dataflow';

jest.mock('@antv/x6', () => ({
  Graph: {
    registerNode: jest.fn(),
    registerEdge: jest.fn(),
  },
}));

describe('Dataflow Module', () => {
  let graphMock: jest.Mocked<Graph>;

  beforeEach(() => {
    graphMock = {
      createNode: jest.fn(),
      addEdge: jest.fn().mockReturnValue({
        appendLabel: jest.fn(),
      }),
    } as unknown as jest.Mocked<Graph>;

    jest.clearAllMocks();
  });

  it('should register the dataflow stencil node correctly', () => {
    dataflow.register();

    expect(Graph.registerNode).toHaveBeenCalledWith(
      'dataflow-stencil',
      {
        inherit: 'path',
        width: 80,
        height: 40,
        zIndex: 3,
        markup: [
          {
            tagName: 'path',
            selector: 'boundary',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
        attrs: {
          boundary: {
            strokeWidth: 1.0,
            stroke: 'black',
            fill: 'transparent',
            refD: 'M 30 20 C 80 20 65 100 110 100',
          },
          label: {
            text: 'Data flow',
            fill: 'black',
            textVerticalAnchor: 'middle',
          },
          line: {
            targetMarker: 'block',
            sourceMarker: '',
          },
        },
      },
      true,
    );

    expect(Graph.registerEdge).toHaveBeenCalledWith(
      'dataflow-edge',
      {
        inherit: 'edge',
        attrs: {
          line: {
            stroke: 'black',
            strokeWidth: 0.8,
          },
        },
      },
      true,
    );
  });

  it('should throw an error if registering the dataflow edge fails', () => {
    (Graph.registerEdge as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    expect(() => dataflow.register()).toThrowError('Registering dataflow failed');
  });

  it('should create a dataflow stencil node', () => {
    const nodeMock = {
      setAttrs: jest.fn(),
    } as Partial<Node>; // Mock a partial Node

    graphMock.createNode.mockReturnValue(nodeMock as Node); // Return the mock node

    const node = dataflow.createEdgeStencil(graphMock);

    expect(graphMock.createNode).toHaveBeenCalledWith({
      shape: 'dataflow-stencil',
    });

    expect(node).toBe(nodeMock);
  });

  it('should set dataflow label attributes correctly', () => {
    const attrs = dataflow.setDataflowLabel('Test Label', 'HTTP', 'STRIDE');

    expect(attrs).toEqual({
      markup: [
        { tagName: 'rect', selector: 'body' },
        { tagName: 'text', selector: 'label' },
        { tagName: 'rect', selector: 'protocolBody' },
        { tagName: 'text', selector: 'protocol' },
        { tagName: 'rect', selector: 'strideBody' },
        { tagName: 'text', selector: 'stride' },
      ],
      attrs: {
        label: {
          text: 'Test Label',
          fill: '#000',
          fontSize: 12,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          textWrap: {
            breakWord: true,
            ellipsis: true,
            height: 40,
            text: "Test Label",
            width: 250,
          },
        },
        body: {
          ref: 'label',
          fill: '#fff',
          rx: 4,
          ry: 4,
          refWidth: '140%',
          refHeight: '140%',
          refX: '-20%',
          refY: '-20%',
        },
        protocol: {
          ref: 'label',
          text: 'HTTP',
          fill: 'white',
          fontSize: 10,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          pointerEvents: 'none',
          refY: -7,
          textWrap: {
            ellipsis: true,
            height: 20,
            text: "HTTP",
          },
        },
        protocolBody: {
          ref: 'protocol',
          fill: 'black',
          stroke: 'black',
          strokeWidth: 6,
          rx: 4,
          ry: 4,
          refWidth: '100%',
          refHeight: '100%',
          refX: '0%',
          refY: '0%',
        },
        stride: {
          ref: 'label',
          text: 'STRIDE',
          fill: '#ff0000',
          fontSize: 8,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          pointerEvents: 'none',
          refY: 20,
        },
        strideBody: {
          ref: 'stride',
          fill: '#fff',
          rx: 4,
          ry: 4,
          refWidth: '140%',
          refHeight: '140%',
          refX: '-20%',
          refY: '-20%',
        },
      },
    });
  });

  it('should create a dataflow edge with correct attributes', () => {
    const nodeMock = {
      getPosition: jest.fn().mockReturnValue({ x: 100, y: 100 }),
    } as Partial<Node>;

    const edgeMock = {
      appendLabel: jest.fn(),
    };

    graphMock.addEdge.mockReturnValue(edgeMock as any); // Mock the edge

    dataflow.createEdge(graphMock, nodeMock as Node);

    expect(graphMock.addEdge).toHaveBeenCalledWith({
      shape: 'dataflow-edge',
      source: { x: 100, y: 100 },
      target: { x: 200, y: 150 },
      vertices: [{ x: 150, y: 125 }],
    });

    expect(edgeMock.appendLabel).toHaveBeenCalledWith(
      dataflow.setDataflowLabel('Data flow', '', ''),
    );
  });
});
