import { renderHook, act } from '@testing-library/react-hooks';
import { Graph, Cell } from '@antv/x6';
import { useDispatch, useSelector } from 'react-redux';
import useNodeEvents from '../../../../renderer/hooks/model-editor/useNodeEvents';
import {
  setSelectedNodeId,
  setSelectedEdgeId,
  setTextModeInputValue,
  setTextModeSelectedCell,
  setActorModalOpen,
  setActorModalSelectedCell,
  setActorName,
  setActorDescription,
  setSystemModalOpen,
  setSystemModalSelectedCell,
  setSystemName,
  setSystemStack,
  setSystemDescription,
  setZoneModalOpen,
  setZoneModalSelectedCell,
  setZoneName,
  setZoneTrustLevel,
  setZoneDescription,
} from '../../../../renderer/store/modelEditor';

// Mock useDispatch and useSelector
const mockUseDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockUseDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('useNodeEvents hook', () => {
  let mockGraph: Graph;
  let mockCell: Partial<Cell> & {
    getAttrs: () => any;
    getData: () => any; 
    isNode: () => boolean;
  };
  let nodeSelectedCallback: Function;
  let nodeUnselectedCallback: Function;
  let nodeContextmenuCallback: Function;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Graph
    mockGraph = {
      on: jest.fn((event: string, callback: Function) => {
        if (event === 'node:selected') nodeSelectedCallback = callback;
        if (event === 'node:unselected') nodeUnselectedCallback = callback;
        if (event === 'node:contextmenu') nodeContextmenuCallback = callback;
      }),
      off: jest.fn(),
      getSelectedCells: jest.fn(() => []),
    } as unknown as Graph;

    // Mock Cell with proper type predicate for `isNode`
    mockCell = {
      id: 'mockCellId',
      shape: 'actor',  // We set the shape initially since it's read-only
      isNode: jest.fn(() => true),  // Mock type predicate correctly
      getAttrs: jest.fn(() => ({
        text: { text: 'Mock Text' },
        name: { text: 'Actor Name' },
        stack: { text: 'Mock Stack' },
        trustLevel: { text: 'High Trust' },
      })),
      getData: jest.fn(() => ({
        description: 'Mock Description'
      })),
    } as unknown as Partial<Cell> & {
      getAttrs: () => any;
      getData: () => any; 
      isNode: () => boolean;
    };
    
    // Mock useSelector responses
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { selectedNodeId: null },
        settings: { explicitObjectSelection: false },
      })
    );
  });

  it('should return early if graph is undefined', () => {
    renderHook(() => useNodeEvents(undefined));
    expect(mockGraph.on).not.toHaveBeenCalled();
  });

  it('should handle node:selected event', () => {
    renderHook(() => useNodeEvents(mockGraph));

    // Simulate node:selected event
    act(() => {
      nodeSelectedCallback({ cell: mockCell });
    });

    expect(mockUseDispatch).toHaveBeenCalledWith(setSelectedEdgeId(null));
    expect(mockUseDispatch).toHaveBeenCalledWith(setSelectedNodeId('mockCellId'));
  });

  it('should handle node:unselected event', () => {
    // Mock selectedNodeId to match mockCell.id
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { selectedNodeId: 'mockCellId' },
        settings: { explicitObjectSelection: false },
      })
    );

    renderHook(() => useNodeEvents(mockGraph));

    // Simulate node:unselected event
    act(() => {
      nodeUnselectedCallback({ cell: mockCell });
    });

    expect(mockUseDispatch).toHaveBeenCalledWith(setSelectedNodeId(null));
    expect(mockUseDispatch).toHaveBeenCalledWith(setSelectedEdgeId(null));
  });

  it('should handle node:contextmenu event for an actor', () => {
    renderHook(() => useNodeEvents(mockGraph));

    // Simulate node:contextmenu event
    act(() => {
      nodeContextmenuCallback({
        cell: mockCell,
        e: new MouseEvent('contextmenu'),
      });
    });

    expect(mockUseDispatch).toHaveBeenCalledWith(setTextModeInputValue('Mock Text'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setTextModeSelectedCell('mockCellId'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setActorName('Actor Name'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setActorDescription('Mock Description'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setActorModalSelectedCell('mockCellId'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setActorModalOpen(true));
  });

  it('should handle node:contextmenu event for a system', () => {
    // Re-initialize the mockCell with `system` shape
    mockCell = {
      ...mockCell,
      shape: 'system',
    };

    renderHook(() => useNodeEvents(mockGraph));

    // Simulate node:contextmenu event
    act(() => {
      nodeContextmenuCallback({
        cell: mockCell,
        e: new MouseEvent('contextmenu'),
      });
    });

    expect(mockUseDispatch).toHaveBeenCalledWith(setSystemName('Actor Name'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setSystemStack('Mock Stack'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setSystemDescription('Mock Description'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setSystemModalSelectedCell('mockCellId'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setSystemModalOpen(true));
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useNodeEvents(mockGraph));

    unmount();

    expect(mockGraph.off).toHaveBeenCalledWith('node:selected', expect.any(Function));
    expect(mockGraph.off).toHaveBeenCalledWith('node:unselected', expect.any(Function));
    expect(mockGraph.off).toHaveBeenCalledWith('node:contextmenu', expect.any(Function));
  });

  it('should handle node:contextmenu event for a zone', () => {
    // Re-initialize the mockCell with `zone` shape
    mockCell = {
      ...mockCell,
      shape: 'zone',
    };
  
    renderHook(() => useNodeEvents(mockGraph));
  
    // Simulate node:contextmenu event
    act(() => {
      nodeContextmenuCallback({
        cell: mockCell,
        e: new MouseEvent('contextmenu'),
      });
    });
  
    // Verify that the correct zone-related dispatch actions are called
    expect(mockUseDispatch).toHaveBeenCalledWith(setZoneName('Actor Name'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setZoneTrustLevel('High Trust'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setZoneDescription('Mock Description'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setZoneModalSelectedCell('mockCellId'));
    expect(mockUseDispatch).toHaveBeenCalledWith(setZoneModalOpen(true));
  });
  
  it('should handle node:contextmenu event when explicitObjectSelection is false', () => {
    // Mock useSelector to return explicitObjectSelection as false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { selectedNodeId: null },
        settings: { explicitObjectSelection: false },  // explicitObjectSelection is false
      })
    );
  
    renderHook(() => useNodeEvents(mockGraph));
  
    // Simulate node:contextmenu event
    act(() => {
      nodeContextmenuCallback({
        cell: mockCell,
        e: new MouseEvent('contextmenu'),
      });
    });
  
    expect(mockUseDispatch).toHaveBeenCalledWith(setTextModeInputValue('Mock Text'));
    // Other dispatch checks here...
  });

  it('should handle node:contextmenu event when explicitObjectSelection is true and selectedNodeId matches cell.id', () => {
    // Mock useSelector to return explicitObjectSelection as true and selectedNodeId matching cell.id
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { selectedNodeId: 'mockCellId' },  // selectedNodeId matches cell.id
        settings: { explicitObjectSelection: true },    // explicitObjectSelection is true
      })
    );
  
    renderHook(() => useNodeEvents(mockGraph));
  
    // Simulate node:contextmenu event
    act(() => {
      nodeContextmenuCallback({
        cell: mockCell,
        e: new MouseEvent('contextmenu'),
      });
    });
  
    expect(mockUseDispatch).toHaveBeenCalledWith(setTextModeInputValue('Mock Text'));
    // Other dispatch checks here...
  });  
});
