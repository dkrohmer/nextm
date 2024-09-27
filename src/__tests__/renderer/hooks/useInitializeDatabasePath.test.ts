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
