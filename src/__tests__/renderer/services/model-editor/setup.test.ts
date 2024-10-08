import { Cell, Graph } from '@antv/x6';
import { History } from '@antv/x6-plugin-history';
import setup from '../../../../renderer/services/model-editor/setup';

jest.mock('@antv/x6', () => ({
  Graph: jest.fn().mockImplementation(() => ({
    use: jest.fn().mockReturnThis(),
    options: {
      embedding: {
        enabled: true,
        findParent: jest.fn(),
      },
    },
    getNodes: jest.fn(),
  })),
}));

jest.mock('@antv/x6-plugin-transform', () => ({
  Transform: jest.fn().mockImplementation(() => ({
    resizing: {
      minHeight: jest.fn((cell: Cell) => (cell.shape === 'system' ? 80 : 40)),
      preserveAspectRatio: jest.fn((cell: Cell) => cell.shape === 'system'),
    },
  })),
}));

jest.mock('@antv/x6-plugin-selection', () => ({
  Selection: jest.fn(),
}));

jest.mock('@antv/x6-plugin-snapline', () => ({
  Snapline: jest.fn(),
}));

jest.mock('@antv/x6-plugin-keyboard', () => ({
  Keyboard: jest.fn(),
}));

jest.mock('@antv/x6-plugin-clipboard', () => ({
  Clipboard: jest.fn(),
}));

jest.mock('@antv/x6-plugin-history', () => ({
  History: jest.fn(),
}));

jest.mock('@antv/x6-plugin-export', () => ({
  Export: jest.fn(),
}));

describe('Graph setup', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    let beforeAddCommand: (event: string, args: any) => boolean;
    container = document.createElement('div');

    document.getElementById = jest.fn((id) => {
      if (id === 'topbar') {
        return { offsetHeight: 50 } as HTMLElement;
      }
      if (id === 'toolbar') {
        return { offsetHeight: 30 } as HTMLElement;
      }
      return null;
    });

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 800,
    });

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1200,
    });

    setup.create(container, 'dot');
    beforeAddCommand = (History as unknown as jest.Mock).mock.calls[0][0]
      .beforeAddCommand;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should use the History plugin with the correct command filter', () => {
    setup.create(container, 'dot');

    expect(History).toHaveBeenCalledWith({
      beforeAddCommand: expect.any(Function),
    });

    const { beforeAddCommand } = (History as unknown as jest.Mock).mock
      .calls[0][0];

    const argsWithVertices = {
      current: { items: ['edge-vertices'] },
      previous: {},
    };
    expect(beforeAddCommand('event', argsWithVertices)).toBe(false);

    const argsWithHandles = {
      current: { items: ['edge-source-handle', 'edge-target-handle'] },
      previous: {},
    };
    expect(beforeAddCommand('event', argsWithHandles)).toBe(false);

    const argsWithHighlight = {
      current: {},
      previous: {},
      options: { propertyPath: 'attrs/line/strokeWidth' },
    };
    expect(beforeAddCommand('event', argsWithHighlight)).toBe(false);

    const argsNormal = {
      current: { items: ['normal-item'] },
      previous: {},
    };
    expect(beforeAddCommand('event', argsNormal)).toBe(true);
  });

  it('should return false when args.previous contains filtered items', () => {
    const mockGraph = new Graph({
      container,
    }) as unknown as Graph;

    const { beforeAddCommand } = (History as unknown as jest.Mock).mock
      .calls[0][0];

    const argsWithFilteredItems = {
      previous: {
        items: ['edge-vertices', 'some-other-item'],
      },
      current: {},
    };

    const result = beforeAddCommand('someEvent', argsWithFilteredItems);

    expect(result).toBe(false);
  });

  it('should return true when args.previous contains no filtered items', () => {
    const { beforeAddCommand } = (History as unknown as jest.Mock).mock
      .calls[0][0];

    const argsWithNoFilteredItems = {
      previous: {
        items: ['normal-item'],
      },
      current: {},
    };

    const result = beforeAddCommand('someEvent', argsWithNoFilteredItems);

    expect(result).toBe(true);
  });

  it('should return false when args.previous contains edge-source-handle or edge-target-handle', () => {
    const mockGraph = new Graph({
      container,
    }) as unknown as Graph;

    const { beforeAddCommand } = (History as unknown as jest.Mock).mock
      .calls[0][0];

    const argsWithEdgeSourceHandle = {
      previous: {
        items: ['edge-source-handle'],
      },
      current: {},
    };

    const resultSource = beforeAddCommand(
      'someEvent',
      argsWithEdgeSourceHandle,
    );
    expect(resultSource).toBe(false);

    const argsWithEdgeTargetHandle = {
      previous: {
        items: ['edge-target-handle'],
      },
      current: {},
    };

    const resultTarget = beforeAddCommand(
      'someEvent',
      argsWithEdgeTargetHandle,
    );
    expect(resultTarget).toBe(false);
  });
});
