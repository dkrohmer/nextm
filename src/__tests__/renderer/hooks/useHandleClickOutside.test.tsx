import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { setSidebarVisible } from '../../../renderer/store/settings';
import useHandleClickOutside from '../../../renderer/hooks/useHandleClickOutside';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

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

    fireEvent.mouseDown(getByTestId('inside-div'));

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should dispatch setSidebarVisible(false) when clicking outside the element', () => {
    const { getByTestId } = render(<TestComponent />);

    fireEvent.mouseDown(getByTestId('outside-div'));

    expect(mockDispatch).toHaveBeenCalledWith(setSidebarVisible(false));
  });

  it('should clean up the event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(<TestComponent />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
