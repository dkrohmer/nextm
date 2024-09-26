import { renderHook, act } from '@testing-library/react';
import { hideToast } from '../../../renderer/store/settings';
import toast from 'react-hot-toast';
import useToastNotifications from '../../../renderer/hooks/useToastNotifications';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('react-hot-toast', () => ({
  promise: jest.fn(),
  dismiss: jest.fn(),
}));

describe('useToastNotifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call toast.promise with correct messages when toastVisible is true', async () => {
    const mockPromise = Promise.resolve();
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          toastVisible: true,
          toastPromise: mockPromise,
          toastLoadingMessage: 'Loading...',
          toastSuccessMessage: 'Success!',
          toastErrorMessage: 'Error!',
        },
      }),
    );

    (toast.promise as jest.Mock).mockReturnValue(mockPromise);

    renderHook(() => useToastNotifications());

    expect(toast.dismiss).toHaveBeenCalled();
    expect(toast.promise).toHaveBeenCalledWith(
      mockPromise,
      {
        loading: 'Loading...',
        success: 'Success!',
        error: 'Error!',
      },
      {
        className: 'toast-container',
      },
    );

    await act(async () => {
      await mockPromise;
    });

    expect(mockDispatch).toHaveBeenCalledWith(hideToast());
  });

  it('should not call toast.promise if toastVisible is false', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          toastVisible: false,
          toastPromise: null,
          toastLoadingMessage: '',
          toastSuccessMessage: '',
          toastErrorMessage: '',
        },
      }),
    );

    renderHook(() => useToastNotifications());

    expect(toast.promise).not.toHaveBeenCalled();
  });

  it('should not call toast.promise if toastPromise is null', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          toastVisible: true,
          toastPromise: null,
          toastLoadingMessage: 'Loading...',
          toastSuccessMessage: 'Success!',
          toastErrorMessage: 'Error!',
        },
      }),
    );

    renderHook(() => useToastNotifications());

    expect(toast.promise).not.toHaveBeenCalled();
  });
});
