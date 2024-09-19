import { Graph, Node } from '@antv/x6';
import system from '../../../renderer/shapes/system';

jest.mock('@antv/x6', () => ({
  Graph: {
    registerNode: jest.fn(),
  },
}));

describe('System Module', () => {
  let graphMock: jest.Mocked<Graph>;

  beforeEach(() => {
    graphMock = {
      createNode: jest.fn(),
    } as unknown as jest.Mocked<Graph>;

    jest.clearAllMocks();
  });

  it('should register the system node correctly', () => {
    system.register();

    expect(Graph.registerNode).toHaveBeenCalledWith(
      'system',
      {
        inherit: 'circle',
        width: 80,
        height: 80,
        data: {
          description: '',
        },
        markup: [
          {
            tagName: 'circle',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'name',
          },
          {
            tagName: 'rect',
            selector: 'stackBody',
          },
          {
            tagName: 'text',
            selector: 'stack',
          },
        ],
      },
      true,
    );
  });

  it('should throw an error when registering the system node fails', () => {
    (Graph.registerNode as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    expect(() => system.register()).toThrowError('Registering system failed');
  });

  it('should create a system node with correct attributes', () => {
    const nodeMock = {
      setAttrs: jest.fn(),
    } as Partial<Node>; // Mock a partial Node

    graphMock.createNode.mockReturnValue(nodeMock as Node);

    const node = system.create(graphMock);

    expect(graphMock.createNode).toHaveBeenCalledWith({
      shape: 'system',
    });

    expect(nodeMock.setAttrs).toHaveBeenCalledWith({
      body: {
        strokeWidth: 1,
      },
      name: {
        text: 'System',
        refY: 0.5,
        refX: 0.5,
        textAnchor: 'middle',
        fontSize: 12,
      },
      stackBody: {
        ref: 'stack',
        fill: 'black',
        stroke: 'white',
        strokeWidth: 2,
        rx: 4,
        ry: 4,
        refWidth: '140%',
        refHeight: '140%',
        refX: '-20%',
        refY: '-20%',
      },
      stack: {
        ref: 'name',
        text: '',
        fill: 'white',
        fontSize: 10,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
        pointerEvents: 'none',
        refY: -7,
      },
    });

    expect(node).toBe(nodeMock);
  });

  it('should set system attributes correctly', () => {
    const attrs = system.setSystemAttrs('System Name', 'Tech Stack');

    expect(attrs).toEqual({
      body: {
        strokeWidth: 1,
      },
      name: {
        text: 'System Name',
        refY: 0.5,
        refX: 0.5,
        textAnchor: 'middle',
        fontSize: 12,
      },
      stackBody: {
        ref: 'stack',
        fill: 'black',
        stroke: 'white',
        strokeWidth: 2,
        rx: 4,
        ry: 4,
        refWidth: '140%',
        refHeight: '140%',
        refX: '-20%',
        refY: '-20%',
      },
      stack: {
        ref: 'name',
        text: 'Tech Stack',
        fill: 'white',
        fontSize: 10,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
        pointerEvents: 'none',
        refY: -7,
      },
    });
  });
});
