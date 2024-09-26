import { renderHook } from '@testing-library/react-hooks';
import { Graph } from '@antv/x6';
import useSetupStencil from '../../../../renderer/hooks/model-editor/useSetupStencil';

// Mock the necessary modules
jest.mock('@antv/x6-plugin-stencil', () => ({
  Stencil: jest.fn().mockImplementation(() => ({
    container: document.createElement('div'),
    load: jest.fn(),
  })),
}));

jest.mock('../../../../renderer/shapes/actor', () => ({
  create: jest.fn(() => ({ type: 'actor' })),
}));

jest.mock('../../../../renderer/shapes/system', () => ({
  create: jest.fn(() => ({ type: 'system' })),
}));

jest.mock('../../../../renderer/shapes/zone', () => ({
  create: jest.fn(() => ({ type: 'zone' })),
}));

jest.mock('../../../../renderer/shapes/dataflow', () => ({
  createEdgeStencil: jest.fn(() => ({ type: 'dataflow' })),
}));

describe('useSetupStencil hook', () => {
  let graph: Graph;

  beforeEach(() => {
    // Create a Graph instance before each test
    graph = new Graph({ container: document.createElement('div') });
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  it('should log an error if no graph is provided', () => {
    // Mock console.error
    console.error = jest.fn();

    // Render the hook with an undefined graph
    renderHook(() => useSetupStencil(undefined as unknown as Graph));

    // Ensure an error was logged
    expect(console.error).toHaveBeenCalledWith('Graph is not provided');
  });
});
