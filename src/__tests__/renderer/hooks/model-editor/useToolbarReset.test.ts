import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import {
  setSavePressed,
  setExportPressed,
  setImportPressed,
  setFitViewPressed,
  setZoomInPressed,
  setZoomOutPressed,
  setUndoPressed,
  setRedoPressed,
  setSelectAllPressed,
  setCutPressed,
  setCopyPressed,
  setPastePressed,
  setDeletePressed,
} from '../../../../renderer/store/modelEditor';
import useToolbarStateReset from '../../../../renderer/hooks/model-editor/useToolbarStateReset';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../../../../renderer/store/modelEditor', () => ({
  setSavePressed: jest.fn(),
  setExportPressed: jest.fn(),
  setImportPressed: jest.fn(),
  setFitViewPressed: jest.fn(),
  setZoomInPressed: jest.fn(),
  setZoomOutPressed: jest.fn(),
  setUndoPressed: jest.fn(),
  setRedoPressed: jest.fn(),
  setSelectAllPressed: jest.fn(),
  setCutPressed: jest.fn(),
  setCopyPressed: jest.fn(),
  setPastePressed: jest.fn(),
  setDeletePressed: jest.fn(),
}));

describe('useToolbarStateReset', () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    jest.clearAllMocks();
  });

  it('should dispatch the correct actions when all states are true', () => {
    jest.useFakeTimers();

    const states = {
      isSavePressed: true,
      isExportPressed: true,
      isImportPressed: true,
      isFitViewPressed: true,
      isZoomInPressed: true,
      isZoomOutPressed: true,
      isUndoPressed: true,
      isRedoPressed: true,
      isSelectAllPressed: true,
      isCutPressed: true,
      isCopyPressed: true,
      isPastePressed: true,
      isDeletePressed: true,
    };

    renderHook(() => useToolbarStateReset(states));

    act(() => {
      jest.runAllTimers();
    });

    expect(dispatchMock).toHaveBeenCalledWith(setSavePressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setExportPressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setImportPressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setFitViewPressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setZoomInPressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setZoomOutPressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setUndoPressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setRedoPressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setSelectAllPressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setCutPressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setCopyPressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setPastePressed(false));
    expect(dispatchMock).toHaveBeenCalledWith(setDeletePressed(false));

    expect(dispatchMock).toHaveBeenCalledTimes(13);

    jest.useRealTimers();
  });
});
