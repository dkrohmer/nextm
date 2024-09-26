import { renderHook } from '@testing-library/react-hooks';
import {
  setImportFileName,
  setImportJsonData,
  setImportError,
  setImportIsFileValid,
} from '../../../../renderer/store/modelEditor';
import useResetImportModalState from '../../../../renderer/hooks/model-editor/useResetImportModalState';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('useResetImportModalState hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch actions to reset import modal state when isImportModalOpen is false', () => {
    renderHook(() => useResetImportModalState(false));

    expect(mockDispatch).toHaveBeenCalledWith(setImportFileName(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportJsonData(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportError(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportIsFileValid(false));
  });

  it('should not dispatch actions when isImportModalOpen is true', () => {
    renderHook(() => useResetImportModalState(true));

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
