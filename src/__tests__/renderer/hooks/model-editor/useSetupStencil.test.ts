import { renderHook } from '@testing-library/react-hooks';
import { Graph } from '@antv/x6';
import useSetupStencil from '../../../../renderer/hooks/model-editor/useSetupStencil';

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
    graph = new Graph({ container: document.createElement('div') });
    jest.clearAllMocks();
  });

  it('should log an error if no graph is provided', () => {
    console.error = jest.fn();

    renderHook(() => useSetupStencil(undefined as unknown as Graph));

    expect(console.error).toHaveBeenCalledWith('Graph is not provided');
  });
});
