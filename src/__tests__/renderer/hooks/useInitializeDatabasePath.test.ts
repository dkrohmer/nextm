import { renderHook, waitFor } from '@testing-library/react';
import useInitializeDatabasePath from '../../../renderer/hooks/useInitializeDatabasePath';
import windowElectron from '../../../../mocks/window-electron';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
const mockGetDefaultDbPath = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

beforeEach(() => {
  window.electron = windowElectron;
  jest.clearAllMocks();
});

describe('useInitializeDatabasePath', () => {
  // TODO
  // it('should dispatch setUseDefaultDatabase(true) and setInputPath with default path if path equals default path', async () => {
  //   // Mock useSelector to return a path equal to the default path
  //   mockUseSelector.mockImplementation((selector: any) =>
  //     selector({
  //       settings: { path: 'default/db/path' },
  //     })
  //   );

  //   // Mock the Electron API to return the default database path
  //   mockGetDefaultDbPath.mockResolvedValue('default/db/path');

  //   // Render the hook
  //   renderHook(() => useInitializeDatabasePath());

  //   // Wait for the useEffect async operation to complete
  //   await waitFor(() => expect(mockDispatch).toHaveBeenCalled());

  //   // Ensure setUseDefaultDatabase(true) was dispatched
  //   expect(mockDispatch).toHaveBeenCalledWith({
  //     type: 'settings/setUseDefaultDatabase',
  //     payload: true,
  //   });

  //   // Ensure setInputPath was dispatched with the default path
  //   expect(mockDispatch).toHaveBeenCalledWith({
  //     type: 'settings/setInputPath',
  //     payload: 'default/db/path',
  //   });
  // });

  it('should dispatch setUseDefaultDatabase(false) and setInputPath with path if path does not equal default path', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: { path: 'custom/db/path' },
      }),
    );

    mockGetDefaultDbPath.mockResolvedValue('default/db/path');

    renderHook(() => useInitializeDatabasePath());

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setUseDefaultDatabase',
      payload: false,
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setInputPath',
      payload: 'custom/db/path',
    });
  });
});
