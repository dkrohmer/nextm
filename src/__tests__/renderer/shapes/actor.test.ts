import { Graph, Node } from '@antv/x6';
import actor from '../../../renderer/shapes/actor';

jest.mock('@antv/x6', () => ({
  Graph: {
    registerNode: jest.fn(),
  },
}));

describe('Actor Module', () => {
  let graphMock: jest.Mocked<Graph>;

  beforeEach(() => {
    graphMock = {
      createNode: jest.fn(),
    } as unknown as jest.Mocked<Graph>;

    jest.clearAllMocks();
  });

  it('should register the actor node correctly', () => {
    actor.register();

    expect(Graph.registerNode).toHaveBeenCalledWith(
      'actor',
      {
        inherit: 'rect',
        width: 80,
        height: 40,
        cursor: 'grab',
        data: {
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
        ],
      },
      true,
    );
  });

  it('should throw an error when registering the actor node fails', () => {
    (Graph.registerNode as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    expect(() => actor.register()).toThrowError('Registering actor failed');
  });

  it('should create a node with actor attributes', () => {
    const nodeMock = {
      setAttrs: jest.fn(),
    } as Partial<Node>; // Ensure we use a partial Node

    graphMock.createNode.mockReturnValue(nodeMock as Node); // Cast the return value to Node

    const node = actor.create(graphMock);

    expect(graphMock.createNode).toHaveBeenCalledWith({
      shape: 'actor',
    });

    expect(nodeMock.setAttrs).toHaveBeenCalledWith({
      body: {
        strokeWidth: 1,
        stroke: 'black',
        fill: 'white',
        rx: 2,
        ry: 2,
      },
      name: {
        text: 'Actor',
        refY: 0.5,
        refX: 0.5,
        textAnchor: 'middle',
        fontSize: 12,
      },
    });

    expect(node).toBe(nodeMock);
  });

  it('should set actor attributes correctly', () => {
    const attrs = actor.setActorAttrs('Test Name');

    expect(attrs).toEqual({
      body: {
        strokeWidth: 1,
        stroke: 'black',
        fill: 'white',
        rx: 2,
        ry: 2,
      },
      name: {
        text: 'Test Name',
        refY: 0.5,
        refX: 0.5,
        textAnchor: 'middle',
        fontSize: 12,
      },
    });
  });
});
