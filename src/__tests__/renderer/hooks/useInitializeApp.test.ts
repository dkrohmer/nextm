// src/__tests__/renderer/hooks/useInitializeApp.test.tsx

import { renderHook, waitFor } from '@testing-library/react';
import useInitializeApp from '../../../renderer/hooks/useInitializeApp';
import { useDispatch } from 'react-redux';
import { 
  setDatabasePath, 
  showToast, 
  setGridVisible, 
  setExplicitObjectSelection 
} from '../../../renderer/store/settings';
import windowElectron from '../../../../mocks/window-electron';

// Mock useDispatch and Electron APIs
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

// Mock the Electron API methods
const mockGetCurrentDbPath = jest.fn();
const mockGetGridType = jest.fn();
const mockGetExplicitObjectSelection = jest.fn();

beforeEach(() => {
  window.electron = windowElectron
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useInitializeApp', () => {
  it('should fetch data and dispatch correct actions on mount', async () => {
    // Mock the Electron API responses
    mockGetCurrentDbPath.mockResolvedValue('test/db/path');
    mockGetGridType.mockResolvedValue('gridType');
    mockGetExplicitObjectSelection.mockResolvedValue(true);

    // Run the hook
    renderHook(() => useInitializeApp());

    // Wait for asynchronous effects to finish
    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());

    // Check if setDatabasePath was dispatched with the correct path
    expect(mockDispatch).toHaveBeenCalledWith(setDatabasePath('test/db/path'));

    // Check if showToast was dispatched with the correct messages
    expect(mockDispatch).toHaveBeenCalledWith(showToast({
      promise: Promise.resolve(),
      loadingMessage: '',
      successMessage: 'Current database: test/db/path',
      errorMessage: '',
    }));

    // Check if setGridVisible was dispatched with the correct grid type
    expect(mockDispatch).toHaveBeenCalledWith(setGridVisible('none'));

    // Check if setExplicitObjectSelection was dispatched with the correct value
    expect(mockDispatch).toHaveBeenCalledWith(setExplicitObjectSelection(true));
  });

  it('should handle fallback values when Electron API returns undefined', async () => {
    // Mock the Electron API responses to return undefined
    mockGetCurrentDbPath.mockResolvedValue(undefined);
    mockGetGridType.mockResolvedValue(undefined);
    mockGetExplicitObjectSelection.mockResolvedValue(undefined);

    // Run the hook
    renderHook(() => useInitializeApp());

    // Wait for asynchronous effects to finish
    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());

    // Check if setDatabasePath was dispatched with undefined
    expect(mockDispatch).toHaveBeenCalledWith(setDatabasePath('/mock/path'));

    // Check if setGridVisible was dispatched with the fallback value 'none'
    expect(mockDispatch).toHaveBeenCalledWith(setGridVisible('none'));

    // Check if setExplicitObjectSelection was dispatched with the fallback value false
    expect(mockDispatch).toHaveBeenCalledWith(setExplicitObjectSelection(false));
  });
});
