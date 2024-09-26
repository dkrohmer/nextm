import { renderHook } from '@testing-library/react-hooks';
import useResetImportModalState from '../../../../renderer/hooks/model-editor/useResetImportModalState';
import {
  setImportFileName,
  setImportJsonData,
  setImportError,
  setImportIsFileValid,
} from '../../../../renderer/store/modelEditor';

// Mock the dispatch function
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('useResetImportModalState hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch actions to reset import modal state when isImportModalOpen is false', () => {
    // Call the hook with isImportModalOpen set to false
    renderHook(() => useResetImportModalState(false));

    // Verify that the appropriate actions were dispatched
    expect(mockDispatch).toHaveBeenCalledWith(setImportFileName(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportJsonData(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportError(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportIsFileValid(false));
  });

  it('should not dispatch actions when isImportModalOpen is true', () => {
    // Call the hook with isImportModalOpen set to true
    renderHook(() => useResetImportModalState(true));

    // Verify that no actions were dispatched
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
