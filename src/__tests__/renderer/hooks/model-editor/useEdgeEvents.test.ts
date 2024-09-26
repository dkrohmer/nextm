import { renderHook } from '@testing-library/react-hooks';
import { Graph, Cell } from '@antv/x6';
import { setSelectedEdgeId, setDataflowModalOpen } from '../../../../renderer/store/modelEditor';
import useEdgeEvents from '../../../../renderer/hooks/model-editor/useEdgeEvents';

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

describe('useEdgeEvents hook', () => {
  let mockGraph: Graph;
  let mockCell: Partial<Cell> & {
    getLabelAt: (index: number) => any;
    isEdge: () => boolean;
  };
  let edgeSelectedCallback: Function;
  let edgeUnselectedCallback: Function;
  let edgeContextmenuCallback: Function;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGraph = {
      on: jest.fn((event: string, callback: Function) => {
        if (event === 'edge:selected') edgeSelectedCallback = callback;
        if (event === 'edge:unselected') edgeUnselectedCallback = callback;
        if (event === 'edge:contextmenu') edgeContextmenuCallback = callback;
      }),
      off: jest.fn(),
      getSelectedCells: jest.fn(() => []),
    } as unknown as Graph;

    mockCell = {
      id: 'mockCellId',
      isEdge: jest.fn(() => true),
      addTools: jest.fn(),
      removeTools: jest.fn(),
      getLabelAt: jest.fn(() => ({
        attrs: {
          label: { text: 'mockLabel' },
          protocol: { text: 'mockProtocol' },
          stride: { text: 'STRIDE' },
        },
      })),
    } as unknown as Partial<Cell> & {
      getLabelAt: (index: number) => any;
      isEdge: () => boolean;
    };
  });

  it('should return early and not register events if graph is null', () => {
    renderHook(() => useEdgeEvents(undefined));

    expect(mockGraph.on).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should handle edge:selected event', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { selectedEdgeId: null },
        settings: { explicitObjectSelection: false },
      }),
    );

    renderHook(() => useEdgeEvents(mockGraph));

    edgeSelectedCallback({ cell: mockCell as unknown as Cell });

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedEdgeId('mockCellId'));
    expect(mockCell.addTools).toHaveBeenCalledWith([
      'edge-vertices',
      'edge-source-handle',
      'edge-target-handle',
    ]);
  });

  it('should handle edge:unselected event', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { selectedEdgeId: 'mockCellId' },
        settings: { explicitObjectSelection: false },
      }),
    );

    renderHook(() => useEdgeEvents(mockGraph));

    edgeUnselectedCallback({ cell: mockCell as unknown as Cell });

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedEdgeId(null));
    expect(mockCell.removeTools).toHaveBeenCalled();
  });

  it('should handle edge:contextmenu event', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { selectedEdgeId: 'mockCellId' },
        settings: { explicitObjectSelection: true },
      }),
    );

    renderHook(() => useEdgeEvents(mockGraph));

    edgeContextmenuCallback({
      cell: mockCell as unknown as Cell,
      e: new MouseEvent('contextmenu'),
    });

    expect(mockDispatch).toHaveBeenCalledWith(setDataflowModalOpen(true));
    expect(mockCell.getLabelAt).toHaveBeenCalledWith(0);
  });

  it('should not register any events if graph is not provided', () => {
    renderHook(() => useEdgeEvents(undefined));

    expect(mockGraph.on).not.toHaveBeenCalled();
    expect(mockGraph.off).not.toHaveBeenCalled();
  });
});
