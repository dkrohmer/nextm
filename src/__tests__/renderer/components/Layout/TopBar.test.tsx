import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '../../../../renderer/components/Layout/TopBar';
import { setSidebarVisible } from '../../../../renderer/store/settings';

// Mocking useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('../../../../renderer/store/settings', () => ({
  setSidebarVisible: jest.fn(),
}));

describe('TopBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the TopBar component with the logo and settings icon', () => {
    // Mock useSelector to return the sidebarVisible state as false
    mockUseSelector.mockImplementation((selector: any) => selector({
      settings: { sidebarVisible: false },
    }));

    render(<TopBar />);

    expect(screen.getByTestId('menu-header')).toHaveClass('topbar-menu-header');
    expect(screen.getByTestId('menu-header-logo')).toHaveClass('topbar-menu-header-img');
    expect(screen.getByTestId('menu-settings')).toHaveClass('topbar-menu-item-settings');
    expect(screen.getByTestId('menu-settings-icon')).toHaveClass('cog large icon');
  });

  it('dispatches setSidebarVisible with true when sidebar is not visible', () => {
    mockUseSelector.mockImplementation((selector: any) => selector({
      settings: { sidebarVisible: false },
    }));

    render(<TopBar />);

    fireEvent.click(screen.getByTestId('menu-settings'));
    expect(mockDispatch).toHaveBeenCalledWith(setSidebarVisible(true));
  });

  it('dispatches setSidebarVisible with false when sidebar is visible', () => {
    mockUseSelector.mockImplementation((selector: any) => selector({
      settings: { sidebarVisible: true },
    }));

    render(<TopBar />);

    fireEvent.click(screen.getByTestId('menu-settings'));
    expect(mockDispatch).toHaveBeenCalledWith(setSidebarVisible(false));
  });

  it('handles cases where settings state is missing or undefined', () => {
    // Mock useSelector to simulate missing state
    mockUseSelector.mockImplementation((selector: any) => selector({
      settings: { sidebarVisible: false },
    }));

    render(<TopBar />);

    expect(screen.getByTestId('menu-header')).toBeInTheDocument();
    expect(screen.getByTestId('menu-header-logo')).toBeInTheDocument();
    expect(screen.getByTestId('menu-settings')).toBeInTheDocument();
    expect(screen.getByTestId('menu-settings-icon')).toBeInTheDocument();
  });

  it('does not render any unexpected components', () => {
    mockUseSelector.mockImplementation((selector: any) => selector({
      settings: { sidebarVisible: false },
    }));

    render(<TopBar />);

    expect(screen.queryByText(/Unexpected Component/i)).not.toBeInTheDocument();
  });
});
