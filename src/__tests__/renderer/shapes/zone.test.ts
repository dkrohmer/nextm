import { Graph, Node } from '@antv/x6';
import zone from '../../../renderer/shapes/zone';

jest.mock('@antv/x6', () => ({
  Graph: {
    registerNode: jest.fn(),
  },
}));

describe('Zone Module', () => {
  let graphMock: jest.Mocked<Graph>;

  beforeEach(() => {
    graphMock = {
      createNode: jest.fn(),
    } as unknown as jest.Mocked<Graph>;

    jest.clearAllMocks();
  });

  it('should register the zone node correctly', () => {
    zone.register();

    expect(Graph.registerNode).toHaveBeenCalledWith(
      'zone',
      {
        inherit: 'rect',
        resizing: true,
        width: 80,
        height: 40,
        cursor: 'grab',
        data: {
          parent: true,
          description: '',
        },
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'name',
          },
          {
            tagName: 'text',
            selector: 'trustLevel',
          },
        ],
      },
      true,
    );
  });

  it('should throw an error when registering the zone node fails', () => {
    (Graph.registerNode as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    expect(() => zone.register()).toThrow('Registering zone failed');
  });

  it('should create a zone node with correct attributes', () => {
    const nodeMock = {
      setAttrs: jest.fn(),
    } as Partial<Node>; // Mock a partial Node

    graphMock.createNode.mockReturnValue(nodeMock as Node);

    const node = zone.create(graphMock);

    expect(graphMock.createNode).toHaveBeenCalledWith({
      shape: 'zone',
    });

    expect(nodeMock.setAttrs).toHaveBeenCalledWith({
      body: {
        strokeWidth: 1,
        stroke: 'black',
        fill: 'rgba(255,255,255,0.0)',
        strokeDasharray: '4',
      },
      name: {
        text: 'Zone',
        refX: 0.5,
        refY: 20,
        textAnchor: 'middle',
        textVerticalAnchor: 'bottom',
        textSize: 12,
        textWrap: {
          text: 'Zone',
          ellipsis: true,
          height: 20,
        },
      },
      trustLevel: {
        ref: 'name',
        text: '',
        fill: 'black',
        fontSize: 10,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
        pointerEvents: 'none',
        refY: 20,
        textWrap: {
          text: '',
          ellipsis: true,
          width: 60,
          height: 20,
        },
      },
    });

    expect(node).toBe(nodeMock);
  });

  it('should set zone attributes correctly', () => {
    const attrs = zone.setZoneAttrs('Test Zone', 'High Trust');

    expect(attrs).toEqual({
      body: {
        strokeWidth: 1,
        stroke: 'black',
        fill: 'rgba(255,255,255,0.0)',
        strokeDasharray: '4',
      },
      name: {
        text: 'Test Zone',
        refX: 0.5,
        refY: 20,
        textAnchor: 'middle',
        textVerticalAnchor: 'bottom',
        textSize: 12,
        textWrap: {
          text: 'Test Zone',
          ellipsis: true,
          height: 20,
        },
      },
      trustLevel: {
        ref: 'name',
        text: 'High Trust',
        fill: 'black',
        fontSize: 10,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
        pointerEvents: 'none',
        refY: 20,
        textWrap: {
          text: 'High Trust',
          ellipsis: true,
          width: 60,
          height: 20,
        },
      },
    });
  });
});
