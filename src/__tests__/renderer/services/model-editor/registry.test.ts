import { Graph, Registry } from '@antv/x6';
import registry from '../../../../renderer/services/model-editor/registry'; // Adjust the import path

describe('Edge Tool Registration in Registry', () => {
  // Mock an empty Definition
  const mockDefinition: any = {};

  beforeEach(() => {
    // Use Object.defineProperty to mock the registry data property
    Object.defineProperty(Registry.EdgeTool.registry, 'data', {
      value: {
        'edge-source-handle': undefined,  // Simulating not registered
        'edge-target-handle': undefined,  // Simulating not registered
        'edge-vertices': undefined,       // Simulating not registered
      },
      writable: true,  // Allows us to modify it during tests
    });

    // Mock Graph.registerEdgeTool function
    jest.spyOn(Graph, 'registerEdgeTool').mockImplementation(jest.fn());
  });

  afterEach(() => {
    // Clear mocks after each test to ensure a clean slate
    jest.clearAllMocks();
  });

  it('should register edge-source-handle if not registered', () => {
    // Call the function that registers the edge source handle
    registry.register();

    // Ensure the edge-source-handle is registered correctly
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
    // Modify the registry data to simulate already registered handles
    Registry.EdgeTool.registry.data['edge-source-handle'] = mockDefinition;

    // Call the function that registers the edge source handle
    registry.register();

    // Ensure the edge-source-handle is not registered again
    expect(Graph.registerEdgeTool).not.toHaveBeenCalledWith('edge-source-handle', expect.anything());
  });

  it('should register edge-target-handle if not registered', () => {
    // Call the function that registers the edge target handle
    registry.register();

    // Ensure the edge-target-handle is registered correctly
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
    // Modify the registry data to simulate already registered handles
    Registry.EdgeTool.registry.data['edge-target-handle'] = mockDefinition;

    // Call the function that registers the edge target handle
    registry.register();

    // Ensure the edge-target-handle is not registered again
    expect(Graph.registerEdgeTool).not.toHaveBeenCalledWith('edge-target-handle', expect.anything());
  });

  it('should register edge-vertices if not registered', () => {
    // Call the function that registers the edge vertices handle
    registry.register();

    // Ensure the edge-vertices is registered correctly
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
    // Modify the registry data to simulate already registered handles
    Registry.EdgeTool.registry.data['edge-vertices'] = mockDefinition;

    // Call the function that registers the edge vertices handle
    registry.register();

    // Ensure the edge-vertices is not registered again
    expect(Graph.registerEdgeTool).not.toHaveBeenCalledWith('edge-vertices', expect.anything());
  });
});
