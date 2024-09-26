// src/__tests__/renderer/hooks/useFocusOnSidebarChange.test.tsx

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import useFocusOnSidebarChange from '../../../renderer/hooks/useFocusOnSidebarChange';

// Mock useSelector and mockDispatch functions
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

// Helper component to test the hook
function TestComponent({ sidebarVisible }: { sidebarVisible: boolean }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useFocusOnSidebarChange(containerRef);

  return (
    <div ref={containerRef} tabIndex={-1}>
      Content
    </div>
  );
}

describe('useFocusOnSidebarChange', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not call focus on the container when sidebarVisible is true', () => {
    const focusMock = jest.fn();

    // Mock useSelector to return sidebarVisible as true
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: { sidebarVisible: true },
      }),
    );

    const { container } = render(<TestComponent sidebarVisible />);

    // Manually attach the focus mock to the container
    const divElement = container.querySelector('div');
    if (divElement) {
      divElement.focus = focusMock;
    }

    // Sidebar is visible, so focus should not be called
    expect(focusMock).not.toHaveBeenCalled();
  });

  it('should call focus when sidebarVisible changes from true to false', () => {
    const focusMock = jest.fn();

    // Initially mock useSelector to return sidebarVisible as true
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: { sidebarVisible: true },
      }),
    );

    const { container, rerender } = render(<TestComponent sidebarVisible />);

    // Manually attach the focus mock to the container
    const divElement = container.querySelector('div');
    if (divElement) {
      divElement.focus = focusMock;
    }

    // Sidebar is initially visible, so focus should not be called
    expect(focusMock).not.toHaveBeenCalled();

    // Change the state to sidebarVisible false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: { sidebarVisible: false },
      }),
    );

    rerender(<TestComponent sidebarVisible={false} />);

    // Sidebar is now hidden, so focus should be called
    expect(focusMock).toHaveBeenCalled();
  });
});
