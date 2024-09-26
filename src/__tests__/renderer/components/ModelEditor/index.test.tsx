import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSelector } from 'react-redux';
import { jest } from '@jest/globals';
import { Graph as x6Graph } from '@antv/x6';
import ModelEditor from '../../../../renderer/components/ModelEditor/index';
import Graph from '../../../../renderer/components/ModelEditor/Graph';

// Mock the useSelector hook and other components
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../../../../renderer/components/ModelEditor/Breadcrumbs', () =>
  jest.fn(() => <div data-testid="breadcrumbs" />),
);
jest.mock('../../../../renderer/components/ModelEditor/Loader', () =>
  jest.fn(() => <div data-testid="loader" />),
);
jest.mock('../../../../renderer/components/ModelEditor/Error', () =>
  jest.fn(() => <div data-testid="error" />),
);
jest.mock('../../../../renderer/components/ModelEditor/Graph', () =>
  jest.fn(() => <div data-testid="graph" />),
);

// Mock all the hooks
jest.mock('../../../../renderer/hooks/useFetchVersion');
jest.mock('../../../../renderer/hooks/model-editor/useLoadLatestGraph');
jest.mock('../../../../renderer/hooks/model-editor/useFocusContainer');
jest.mock('../../../../renderer/hooks/useFocusOnSidebarChange');
jest.mock('../../../../renderer/hooks/useUpdateGrid');
jest.mock('../../../../renderer/hooks/model-editor/useKeys');
jest.mock('../../../../renderer/hooks/model-editor/useKeysPreventDefault');
jest.mock('../../../../renderer/hooks/model-editor/useNodeAdded');
jest.mock('../../../../renderer/hooks/model-editor/useEdgeEvents');
jest.mock('../../../../renderer/hooks/model-editor/useNodeEvents');
jest.mock('../../../../renderer/hooks/model-editor/useNodeEmbed');
jest.mock('../../../../renderer/hooks/model-editor/useHoverCells');
jest.mock('../../../../renderer/hooks/model-editor/useInitializeGraph');
jest.mock('../../../../renderer/hooks/model-editor/useGraphHistoryChange');

// Create a mock x6Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

describe('ModelEditor Component', () => {
  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector: any) =>
      selector({
        products: {
          product: { id: '1', name: 'Test', createdAt: 'Test' },
          productIsLoading: false,
          productError: null,
        },
        increments: {
          increment: { id: '1', name: 'Test', productId: '1' },
          incrementIsLoading: false,
          incrementError: null,
        },
        models: {
          model: { id: '1', name: 'Test', incrementId: '1' },
          modelIsLoading: false,
          modelError: null,
        },
        versions: {
          latestVersion: { id: '1', payload: 'Test' },
          latestVersionIsLoading: false,
          latestVersionError: null,
        },
        settings: { gridVisible: true },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ModelEditor component when all necessary data is present', () => {
    render(<ModelEditor />);

    // Check if Breadcrumbs, Loader, Error, and Graph components are rendered
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toBeInTheDocument();

    // Simulate the local state "graph" being populated with mockGraph
    render(<Graph graph={mockGraph} />);
    expect(screen.getByTestId('graph')).toBeInTheDocument();
  });

  it('does not render the Graph component if any necessary data is missing', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector: any) =>
      selector({
        products: {
          product: { id: '1', name: 'Test', createdAt: 'Test' },
          productIsLoading: false,
          productError: null,
        },
        increments: {
          increment: { id: '1', name: 'Test', productId: '1' },
          incrementIsLoading: false,
          incrementError: null,
        },
        models: {
          model: { id: '1', name: 'Test', incrementId: '1' },
          modelIsLoading: false,
          modelError: null,
        },
        versions: {
          latestVersion: { id: '1', payload: 'Test' },
          latestVersionIsLoading: false,
          latestVersionError: null,
        },
        settings: { gridVisible: true },
      }),
    );

    // Test case where the graph is not yet initialized
    render(<ModelEditor />);
    expect(screen.queryByTestId('graph')).not.toBeInTheDocument();

    // Test case where a necessary piece of data is missing
    (useSelector as unknown as jest.Mock).mockImplementation((selector: any) =>
      selector({
        products: {
          product: null,
          productIsLoading: false,
          productError: null,
        },
        increments: {
          increment: { id: '1', name: 'Test', productId: '1' },
          incrementIsLoading: false,
          incrementError: null,
        },
        models: {
          model: { id: '1', name: 'Test', incrementId: '1' },
          modelIsLoading: false,
          modelError: null,
        },
        versions: {
          latestVersion: { id: '1', payload: 'Test' },
          latestVersionIsLoading: false,
          latestVersionError: null,
        },
        settings: { gridVisible: true },
      }),
    );

    render(<ModelEditor />);
    expect(screen.queryByTestId('graph')).not.toBeInTheDocument();
  });
});
