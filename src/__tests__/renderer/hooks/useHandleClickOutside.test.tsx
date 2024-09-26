// src/__tests__/renderer/hooks/useHandleClickOutside.test.tsx

import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import useHandleClickOutside from '../../../renderer/hooks/useHandleClickOutside';
import { setSidebarVisible } from '../../../renderer/store/settings';

// Mock useDispatch function
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

// Test component
function TestComponent() {
  const ref = React.useRef<HTMLDivElement>(null);
  useHandleClickOutside(ref);

  return (
    <div>
      <div ref={ref} data-testid="inside-div">
        Inside
      </div>
      <div data-testid="outside-div">Outside</div>
    </div>
  );
}

describe('useHandleClickOutside', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not dispatch action when clicking inside the element', () => {
    const { getByTestId } = render(<TestComponent />);

    // Simulate a click inside the element
    fireEvent.mouseDown(getByTestId('inside-div'));

    // Verify that dispatch was not called since the click was inside
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should dispatch setSidebarVisible(false) when clicking outside the element', () => {
    const { getByTestId } = render(<TestComponent />);

    // Simulate a click outside the element
    fireEvent.mouseDown(getByTestId('outside-div'));

    // Verify that dispatch was called with setSidebarVisible(false)
    expect(mockDispatch).toHaveBeenCalledWith(setSidebarVisible(false));
  });

  it('should clean up the event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(<TestComponent />);

    // Ensure event listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );

    // Unmount the component and ensure the event listener was removed
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
