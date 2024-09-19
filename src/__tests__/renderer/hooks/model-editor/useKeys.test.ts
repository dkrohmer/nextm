import { renderHook } from '@testing-library/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Graph } from '@antv/x6';
import useKeys from '../../../../renderer/hooks/model-editor/useKeys';
import Actions from '../../../../renderer/services/model-editor/actions';
import { saveModel } from '../../../../renderer/utils/saveModel';
import {
  setExportModalOpen,
  setImportModalOpen,
  setExportPressed,
  setImportPressed,
  setFitViewPressed,
  setZoomInPressed,
  setZoomOutPressed,
  setUndoPressed,
  setRedoPressed,
  setCutPressed,
  setCopyPressed,
  setPastePressed,
  setDeletePressed,
  setSavePressed,
  setSelectAllPressed,
} from '../../../../renderer/store/modelEditor';

// Mock useSelector and useDispatch hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
const mockParams = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('react-router-dom', () => ({
  useParams: () => mockParams(),
}));

jest.mock('../../../../renderer/services/model-editor/actions');
jest.mock('../../../../renderer/utils/saveModel');

describe('useKeys hook', () => {
  let mockGraph: Partial<Graph>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockParams.mockReturnValue({ modelId: 'mockModelId' });
    mockUseSelector.mockReturnValue({ latestVersion: 'mockVersion' });

    // Mock Graph's bindKey and unbindKey methods
    mockGraph = {
      bindKey: jest.fn(),
      unbindKey: jest.fn(),
    };
  });

  it('should bind and unbind all keys when graph is provided', () => {
    const { unmount } = renderHook(() => useKeys(mockGraph as Graph));

    // Check that keys were bound
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+s', 'ctrl+s'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+e', 'ctrl+e'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+i', 'ctrl+i'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+space', 'ctrl+space'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+=', 'ctrl+='], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+-', 'ctrl+-'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+z', 'ctrl+z'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+shift+z', 'ctrl+shift+z'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+a', 'ctrl+a'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+x', 'ctrl+x'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+c', 'ctrl+c'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith(['meta+v', 'ctrl+v'], expect.any(Function));
    expect(mockGraph.bindKey).toHaveBeenCalledWith('backspace', expect.any(Function));

    // Unmount and check that all keys were unbound
    unmount();
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+s', 'ctrl+s']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+e', 'ctrl+e']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+i', 'ctrl+i']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+space', 'ctrl+space']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+=', 'ctrl+=']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+-', 'ctrl+-']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+z', 'ctrl+z']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+shift+z', 'ctrl+shift+z']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+a', 'ctrl+a']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+x', 'ctrl+x']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+c', 'ctrl+c']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith(['meta+v', 'ctrl+v']);
    expect(mockGraph.unbindKey).toHaveBeenCalledWith('backspace');
  });

  it('should handle save operation when meta+s or ctrl+s is pressed', async () => {
    renderHook(() => useKeys(mockGraph as Graph));

    const saveCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+s') || keys.includes('ctrl+s')
    )![1];

    await saveCallback();

    expect(saveModel).toHaveBeenCalledWith('mockModelId', mockGraph, 'mockVersion', mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setSavePressed(true));
  });

  it('should dispatch actions for Export, Import, and other key events', () => {
    renderHook(() => useKeys(mockGraph as Graph));

    const exportCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+e') || keys.includes('ctrl+e')
    )![1];
    exportCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setExportModalOpen(true));
    expect(mockDispatch).toHaveBeenCalledWith(setExportPressed(true));

    const importCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+i') || keys.includes('ctrl+i')
    )![1];
    importCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setImportModalOpen(true));
    expect(mockDispatch).toHaveBeenCalledWith(setImportPressed(true));

    const fitViewCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+space') || keys.includes('ctrl+space')
    )![1];
    (Actions.fitViewAction as jest.Mock).mockReturnValue(true);
    fitViewCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setFitViewPressed(true));

    const zoomInCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+=') || keys.includes('ctrl+=')
    )![1];
    (Actions.zoomInAction as jest.Mock).mockReturnValue(true);
    zoomInCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setZoomInPressed(true));

    const zoomOutCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+-') || keys.includes('ctrl+-')
    )![1];
    (Actions.zoomOutAction as jest.Mock).mockReturnValue(true);
    zoomOutCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setZoomOutPressed(true));

    // Testing Undo (meta+z or ctrl+z)
    const undoCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+z') || keys.includes('ctrl+z')
    )![1];
    (Actions.undoAction as jest.Mock).mockReturnValue(true);
    undoCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setUndoPressed(true));

    // Testing Redo (meta+shift+z or ctrl+shift+z)
    const redoCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+shift+z') || keys.includes('ctrl+shift+z')
    )![1];
    (Actions.redoAction as jest.Mock).mockReturnValue(true);
    redoCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setRedoPressed(true));

    // Testing Cut (meta+x or ctrl+x)
    const cutCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+x') || keys.includes('ctrl+x')
    )![1];
    (Actions.cutAction as jest.Mock).mockReturnValue(true);
    cutCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setCutPressed(true));

    // Testing Copy (meta+c or ctrl+c)
    const copyCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+c') || keys.includes('ctrl+c')
    )![1];
    (Actions.copyAction as jest.Mock).mockReturnValue(true);
    copyCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setCopyPressed(true));

    // Testing Paste (meta+v or ctrl+v)
    const pasteCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+v') || keys.includes('ctrl+v')
    )![1];
    (Actions.pasteAction as jest.Mock).mockReturnValue(true);
    pasteCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setPastePressed(true));

    // Testing Delete (backspace)
    const deleteCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('backspace')
    )![1];
    (Actions.deleteAction as jest.Mock).mockReturnValue(true);
    deleteCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setDeletePressed(true));

    // Testing Select All (meta+a or ctrl+a)
    const selectAllCallback = (mockGraph.bindKey as jest.Mock).mock.calls.find(
      ([keys]) => keys.includes('meta+a') || keys.includes('ctrl+a')
    )![1];
    (Actions.selectAllAction as jest.Mock).mockReturnValue(true);
    selectAllCallback();
    expect(mockDispatch).toHaveBeenCalledWith(setSelectAllPressed(true));
  });

  it('should return early and not bind any keys if graph is undefined', () => {
    // Mock useSelector to simulate the initial state
    mockUseSelector.mockImplementation((selector: any) => 
      selector({
        versions: { latestVersion: null }, // Simulate no version available
      })
    );
  
    // Call the hook with graph as undefined
    renderHook(() => useKeys(undefined));
  
    // Ensure that no key bindings were created
    expect(mockGraph.bindKey).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
  
});
