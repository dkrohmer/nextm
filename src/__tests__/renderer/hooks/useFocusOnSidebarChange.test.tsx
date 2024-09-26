import { render } from '@testing-library/react';
import React from 'react';
import useFocusOnSidebarChange from '../../../renderer/hooks/useFocusOnSidebarChange';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

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

    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: { sidebarVisible: true },
      }),
    );

    const { container } = render(<TestComponent sidebarVisible />);

    const divElement = container.querySelector('div');
    if (divElement) {
      divElement.focus = focusMock;
    }

    expect(focusMock).not.toHaveBeenCalled();
  });

  it('should call focus when sidebarVisible changes from true to false', () => {
    const focusMock = jest.fn();

    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: { sidebarVisible: true },
      }),
    );

    const { container, rerender } = render(<TestComponent sidebarVisible />);

    const divElement = container.querySelector('div');
    if (divElement) {
      divElement.focus = focusMock;
    }

    expect(focusMock).not.toHaveBeenCalled();

    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: { sidebarVisible: false },
      }),
    );

    rerender(<TestComponent sidebarVisible={false} />);

    expect(focusMock).toHaveBeenCalled();
  });
});
