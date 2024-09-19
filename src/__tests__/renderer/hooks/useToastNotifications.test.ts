// src/__tests__/renderer/hooks/useToastNotifications.test.tsx

import { renderHook, act } from '@testing-library/react';
import useToastNotifications from '../../../renderer/hooks/useToastNotifications';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { hideToast } from '../../../renderer/store/settings';

// Mock useDispatch and useSelector
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

// Mock react-hot-toast's promise and dismiss
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
    // Mock the useSelector to return a visible toast and a resolved promise
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
      })
    );

    // Mock toast.promise to return a resolved promise
    (toast.promise as jest.Mock).mockReturnValue(mockPromise);

    // Render the hook
    renderHook(() => useToastNotifications());

    // Ensure that toast.dismiss is called
    expect(toast.dismiss).toHaveBeenCalled();

    // Ensure that toast.promise is called with the correct arguments
    expect(toast.promise).toHaveBeenCalledWith(
      mockPromise,
      {
        loading: 'Loading...',
        success: 'Success!',
        error: 'Error!',
      },
      {
        className: 'toast-container',
      }
    );

    // Simulate the promise resolving and ensure hideToast is dispatched
    await act(async () => {
      await mockPromise;
    });

    expect(mockDispatch).toHaveBeenCalledWith(hideToast());
  });

  it('should not call toast.promise if toastVisible is false', () => {
    // Mock the useSelector to return a hidden toast
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          toastVisible: false,
          toastPromise: null,
          toastLoadingMessage: '',
          toastSuccessMessage: '',
          toastErrorMessage: '',
        },
      })
    );

    // Render the hook
    renderHook(() => useToastNotifications());

    // Ensure that toast.promise is not called since toastVisible is false
    expect(toast.promise).not.toHaveBeenCalled();
  });

  it('should not call toast.promise if toastPromise is null', () => {
    // Mock the useSelector to return a null toastPromise
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          toastVisible: true,
          toastPromise: null,
          toastLoadingMessage: 'Loading...',
          toastSuccessMessage: 'Success!',
          toastErrorMessage: 'Error!',
        },
      })
    );

    // Render the hook
    renderHook(() => useToastNotifications());

    // Ensure that toast.promise is not called since toastPromise is null
    expect(toast.promise).not.toHaveBeenCalled();
  });
});
