import { Graph, Registry } from '@antv/x6';
import registry from '../../../../renderer/services/model-editor/registry';

describe('Edge Tool Registration in Registry', () => {
  const mockDefinition: any = {};

  beforeEach(() => {
    Object.defineProperty(Registry.EdgeTool.registry, 'data', {
      value: {
        'edge-source-handle': undefined,
        'edge-target-handle': undefined,
        'edge-vertices': undefined,
      },
      writable: true,
    });

    jest.spyOn(Graph, 'registerEdgeTool').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register edge-source-handle if not registered', () => {
    registry.register();

    expect(Graph.registerEdgeTool).toHaveBeenCalledWith('edge-source-handle', {
      inherit: 'source-arrowhead',
      tagName: 'circle',
      attrs: {
        r: 5,
        fill: 'black',
        cursor: 'move',
      },
    });
  });

  it('should not register edge-source-handle if already registered', () => {
    Registry.EdgeTool.registry.data['edge-source-handle'] = mockDefinition;

    registry.register();

    expect(Graph.registerEdgeTool).not.toHaveBeenCalledWith(
      'edge-source-handle',
      expect.anything(),
    );
  });

  it('should register edge-target-handle if not registered', () => {
    registry.register();

    expect(Graph.registerEdgeTool).toHaveBeenCalledWith('edge-target-handle', {
      inherit: 'target-arrowhead',
      tagName: 'circle',
      attrs: {
        r: 5,
        fill: 'black',
        cursor: 'move',
      },
    });
  });

  it('should not register edge-target-handle if already registered', () => {
    Registry.EdgeTool.registry.data['edge-target-handle'] = mockDefinition;

    registry.register();

    expect(Graph.registerEdgeTool).not.toHaveBeenCalledWith(
      'edge-target-handle',
      expect.anything(),
    );
  });

  it('should register edge-vertices if not registered', () => {
    registry.register();

    expect(Graph.registerEdgeTool).toHaveBeenCalledWith('edge-vertices', {
      inherit: 'vertices',
      stopPropagation: false,
      attrs: {
        r: 5,
        fill: 'black',
      },
    });
  });

  it('should not register edge-vertices if already registered', () => {
    Registry.EdgeTool.registry.data['edge-vertices'] = mockDefinition;

    registry.register();

    expect(Graph.registerEdgeTool).not.toHaveBeenCalledWith(
      'edge-vertices',
      expect.anything(),
    );
  });
});
