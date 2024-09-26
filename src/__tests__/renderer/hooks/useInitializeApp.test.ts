import { renderHook, waitFor } from '@testing-library/react';
import {
  setDatabasePath,
  showToast,
  setGridVisible,
  setExplicitObjectSelection,
} from '../../../renderer/store/settings';
import useInitializeApp from '../../../renderer/hooks/useInitializeApp';
import windowElectron from '../../../../mocks/window-electron';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock('../../../renderer/store/settings', () => ({
  setDatabasePath: jest.fn(),
  showToast: jest.fn(),
  setGridVisible: jest.fn(),
  setExplicitObjectSelection: jest.fn(),
}));

const mockGetCurrentDbPath = jest.fn();
const mockGetGridType = jest.fn();
const mockGetExplicitObjectSelection = jest.fn();

beforeEach(() => {
  window.electron = windowElectron;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useInitializeApp', () => {
  it('should fetch data and dispatch correct actions on mount', async () => {
    mockGetCurrentDbPath.mockResolvedValue('test/db/path');
    mockGetGridType.mockResolvedValue('gridType');
    mockGetExplicitObjectSelection.mockResolvedValue(true);

    renderHook(() => useInitializeApp());

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());

    expect(mockDispatch).toHaveBeenCalledWith(setDatabasePath('test/db/path'));
    expect(mockDispatch).toHaveBeenCalledWith(
      showToast({
        promise: Promise.resolve(),
        loadingMessage: '',
        successMessage: 'Current database: test/db/path',
        errorMessage: '',
      }),
    );
    expect(mockDispatch).toHaveBeenCalledWith(setGridVisible('none'));
    expect(mockDispatch).toHaveBeenCalledWith(setExplicitObjectSelection(true));
  });

  it('should handle fallback values when Electron API returns undefined', async () => {
    mockGetCurrentDbPath.mockResolvedValue(undefined);
    mockGetGridType.mockResolvedValue(undefined);
    mockGetExplicitObjectSelection.mockResolvedValue(undefined);

    renderHook(() => useInitializeApp());

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());

    expect(mockDispatch).toHaveBeenCalledWith(setDatabasePath('/mock/path'));
    expect(mockDispatch).toHaveBeenCalledWith(setGridVisible('none'));
    expect(mockDispatch).toHaveBeenCalledWith(setExplicitObjectSelection(false));
  });
});
