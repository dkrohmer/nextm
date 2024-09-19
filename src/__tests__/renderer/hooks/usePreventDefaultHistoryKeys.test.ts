// src/__tests__/renderer/hooks/usePreventDefaultHistoryKeys.test.tsx

import { renderHook } from '@testing-library/react';
import usePreventDefaultHistoryKeys from '../../../renderer/hooks/usePreventDefaultHistoryKeys';

describe('usePreventDefaultHistoryKeys', () => {
  let preventDefaultMock: jest.Mock;

  beforeEach(() => {
    preventDefaultMock = jest.fn();
    jest.clearAllMocks();
  });

  it('should call preventDefault when metaKey and ArrowLeft are pressed', () => {
    // Render the hook
    renderHook(() => usePreventDefaultHistoryKeys());

    // Create a keyboard event with metaKey and ArrowLeft
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      metaKey: true,
    });
    Object.defineProperty(event, 'preventDefault', { value: preventDefaultMock });

    // Dispatch the event
    window.dispatchEvent(event);

    // Check that preventDefault was called
    expect(preventDefaultMock).toHaveBeenCalled();
  });

  it('should call preventDefault when ctrlKey and Backspace are pressed', () => {
    // Render the hook
    renderHook(() => usePreventDefaultHistoryKeys());

    // Create a keyboard event with ctrlKey and Backspace
    const event = new KeyboardEvent('keydown', {
      key: 'Backspace',
      ctrlKey: true,
    });
    Object.defineProperty(event, 'preventDefault', { value: preventDefaultMock });

    // Dispatch the event
    window.dispatchEvent(event);

    // Check that preventDefault was called
    expect(preventDefaultMock).toHaveBeenCalled();
  });

  it('should not call preventDefault for unrelated keys', () => {
    // Render the hook
    renderHook(() => usePreventDefaultHistoryKeys());

    // Create a keyboard event with an unrelated key
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
    });
    Object.defineProperty(event, 'preventDefault', { value: preventDefaultMock });

    // Dispatch the event
    window.dispatchEvent(event);

    // Check that preventDefault was NOT called
    expect(preventDefaultMock).not.toHaveBeenCalled();
  });

  it('should clean up the event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => usePreventDefaultHistoryKeys());

    // Ensure addEventListener was called for 'keydown'
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    // Unmount the hook and check if the event listener is removed
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
