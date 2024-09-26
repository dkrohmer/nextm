import { useEffect } from 'react';
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
} from '../../store/modelEditor';

const useToolbarStateReset = (states: Record<string, boolean>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let timerId: number | undefined;
    const resetState = (action: () => void) => {
      timerId = window.setTimeout(action, 100);
    };

    if (states.isSavePressed) resetState(() => dispatch(setSavePressed(false)));
    if (states.isExportPressed)
      resetState(() => dispatch(setExportPressed(false)));
    if (states.isImportPressed)
      resetState(() => dispatch(setImportPressed(false)));
    if (states.isFitViewPressed)
      resetState(() => dispatch(setFitViewPressed(false)));
    if (states.isZoomInPressed)
      resetState(() => dispatch(setZoomInPressed(false)));
    if (states.isZoomOutPressed)
      resetState(() => dispatch(setZoomOutPressed(false)));
    if (states.isUndoPressed) resetState(() => dispatch(setUndoPressed(false)));
    if (states.isRedoPressed) resetState(() => dispatch(setRedoPressed(false)));
    if (states.isSelectAllPressed)
      resetState(() => dispatch(setSelectAllPressed(false)));
    if (states.isCutPressed) resetState(() => dispatch(setCutPressed(false)));
    if (states.isCopyPressed) resetState(() => dispatch(setCopyPressed(false)));
    if (states.isPastePressed)
      resetState(() => dispatch(setPastePressed(false)));
    if (states.isDeletePressed)
      resetState(() => dispatch(setDeletePressed(false)));

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [dispatch, states]);
};

export default useToolbarStateReset;
