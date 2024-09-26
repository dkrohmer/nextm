import { renderHook } from '@testing-library/react-hooks';
import { MutableRefObject } from 'react';
import { Graph } from '@antv/x6';
import useInitializeGraph from '../../../../renderer/hooks/model-editor/useInitializeGraph';
import setup from '../../../../renderer/services/model-editor/setup';
import actor from '../../../../renderer/shapes/actor';
import dataflow from '../../../../renderer/shapes/dataflow';
import system from '../../../../renderer/shapes/system';
import zone from '../../../../renderer/shapes/zone';
import registry from '../../../../renderer/services/model-editor/registry';

// Mock the services and shapes
jest.mock('../../../../renderer/services/model-editor/setup');
jest.mock('../../../../renderer/shapes/actor');
jest.mock('../../../../renderer/shapes/dataflow');
jest.mock('../../../../renderer/shapes/system');
jest.mock('../../../../renderer/shapes/zone');
jest.mock('../../../../renderer/services/model-editor/registry');

describe('useInitializeGraph hook', () => {
  let mockContainerRef: MutableRefObject<HTMLDivElement | null>;
  let mockMinimapRef: MutableRefObject<HTMLDivElement | null>;
  let mockIsGraphInitialized: MutableRefObject<boolean>;
  let mockSetGraph: jest.Mock;

  beforeEach(() => {
    mockContainerRef = { current: document.createElement('div') };
    mockMinimapRef = { current: document.createElement('div') };
    mockIsGraphInitialized = { current: false };
    mockSetGraph = jest.fn();

    // Mock the focus function on the container
    mockContainerRef.current!.focus = jest.fn(); // Use non-null assertion operator here

    jest.clearAllMocks();
  });

  it('should initialize the graph when conditions are met', async () => {
    const mockGraphInstance = {} as Graph;
    (setup.create as jest.Mock).mockReturnValue(mockGraphInstance);

    const { rerender } = renderHook(() =>
      useInitializeGraph(
        mockContainerRef,
        mockMinimapRef,
        mockIsGraphInitialized,
        mockSetGraph,
        'dot',
      ),
    );

    // Verify that the services and shapes are registered
    expect(actor.register).toHaveBeenCalled();
    expect(dataflow.register).toHaveBeenCalled();
    expect(system.register).toHaveBeenCalled();
    expect(zone.register).toHaveBeenCalled();
    expect(registry.register).toHaveBeenCalled();

    // Verify that the graph was created and set
    expect(setup.create).toHaveBeenCalledWith(mockContainerRef.current, 'dot');
    expect(mockSetGraph).toHaveBeenCalledWith(mockGraphInstance);

    // Verify that isGraphInitialized was set to true
    expect(mockIsGraphInitialized.current).toBe(true);

    // Verify that the container received focus
    expect(mockContainerRef.current!.focus).toHaveBeenCalled(); // Use non-null assertion operator here

    // Rerender the hook and ensure the initialization doesn't happen again
    rerender();
    expect(setup.create).toHaveBeenCalledTimes(1); // Ensure it's called only once
  });

  it('should not initialize the graph if the container, minimap are null or graph is already initialized', () => {
    mockContainerRef.current = null;

    renderHook(() =>
      useInitializeGraph(
        mockContainerRef,
        mockMinimapRef,
        mockIsGraphInitialized,
        mockSetGraph,
        'dot',
      ),
    );

    expect(setup.create).not.toHaveBeenCalled();

    // Test when minimap is null
    mockContainerRef.current = document.createElement('div');
    mockMinimapRef.current = null;

    renderHook(() =>
      useInitializeGraph(
        mockContainerRef,
        mockMinimapRef,
        mockIsGraphInitialized,
        mockSetGraph,
        'dot',
      ),
    );

    expect(setup.create).not.toHaveBeenCalled();

    // Test when graph is already initialized
    mockMinimapRef.current = document.createElement('div');
    mockIsGraphInitialized.current = true;

    renderHook(() =>
      useInitializeGraph(
        mockContainerRef,
        mockMinimapRef,
        mockIsGraphInitialized,
        mockSetGraph,
        'dot',
      ),
    );

    expect(setup.create).not.toHaveBeenCalled();
  });
});
