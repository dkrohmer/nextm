import { renderHook } from '@testing-library/react';
import usePreventDefaultHistoryKeys from '../../../renderer/hooks/usePreventDefaultHistoryKeys';

describe('usePreventDefaultHistoryKeys', () => {
  let preventDefaultMock: jest.Mock;

  beforeEach(() => {
    preventDefaultMock = jest.fn();
    jest.clearAllMocks();
  });

  it('should call preventDefault when metaKey and ArrowLeft are pressed', () => {
    renderHook(() => usePreventDefaultHistoryKeys());

    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      metaKey: true,
    });
    Object.defineProperty(event, 'preventDefault', {
      value: preventDefaultMock,
    });

    window.dispatchEvent(event);

    expect(preventDefaultMock).toHaveBeenCalled();
  });

  it('should call preventDefault when ctrlKey and Backspace are pressed', () => {
    renderHook(() => usePreventDefaultHistoryKeys());

    const event = new KeyboardEvent('keydown', {
      key: 'Backspace',
      ctrlKey: true,
    });
    Object.defineProperty(event, 'preventDefault', {
      value: preventDefaultMock,
    });

    window.dispatchEvent(event);

    expect(preventDefaultMock).toHaveBeenCalled();
  });

  it('should not call preventDefault for unrelated keys', () => {
    renderHook(() => usePreventDefaultHistoryKeys());

    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
    });
    Object.defineProperty(event, 'preventDefault', {
      value: preventDefaultMock,
    });

    window.dispatchEvent(event);

    expect(preventDefaultMock).not.toHaveBeenCalled();
  });

  it('should clean up the event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => usePreventDefaultHistoryKeys());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
