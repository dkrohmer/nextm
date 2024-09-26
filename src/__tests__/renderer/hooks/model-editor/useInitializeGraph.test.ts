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

    mockContainerRef.current!.focus = jest.fn();

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

    expect(actor.register).toHaveBeenCalled();
    expect(dataflow.register).toHaveBeenCalled();
    expect(system.register).toHaveBeenCalled();
    expect(zone.register).toHaveBeenCalled();
    expect(registry.register).toHaveBeenCalled();
    expect(setup.create).toHaveBeenCalledWith(mockContainerRef.current, 'dot');
    expect(mockSetGraph).toHaveBeenCalledWith(mockGraphInstance);
    expect(mockIsGraphInitialized.current).toBe(true);
    expect(mockContainerRef.current!.focus).toHaveBeenCalled();

    rerender();
    expect(setup.create).toHaveBeenCalledTimes(1);
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
