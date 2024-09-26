import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SideBar from '../../../../renderer/components/Layout/SideBar';
import settingsReducer, {
  initialSettingsState,
} from '../../../../renderer/store/settings';

// Mock the necessary hooks and components
jest.mock('../../../../renderer/hooks/useHandleClickOutside', () => jest.fn());
jest.mock(
  '../../../../renderer/components/Settings',
  () =>
    function () {
      return <div>Settings Component</div>;
    },
);

// Create a mock store
const createMockStore = (sidebarVisible: boolean) => {
  return configureStore({
    reducer: {
      settings: settingsReducer,
    },
    preloadedState: {
      settings: { ...initialSettingsState, sidebarVisible },
    },
  });
};

describe('SideBar Component', () => {
  it('renders the SideBar component when sidebarVisible is true', () => {
    const store = createMockStore(true);

    render(
      <Provider store={store}>
        <SideBar />
      </Provider>,
    );

    // Check that the Semantic Sidebar is visible with the correct classes
    const sidebarElement = screen
      .getByText('Settings Component')
      .closest('.sidebar');
    expect(sidebarElement).toHaveClass('visible');
    expect(sidebarElement).toHaveClass('animating');
  });

  it('renders the SideBar component but it is hidden when sidebarVisible is false', () => {
    const store = createMockStore(false);

    render(
      <Provider store={store}>
        <SideBar />
      </Provider>,
    );

    // Check that the Semantic Sidebar is rendered but not visible
    const sidebarElement = screen
      .getByText('Settings Component')
      .closest('.sidebar');
    expect(sidebarElement).not.toHaveClass('visible');
    expect(sidebarElement).not.toHaveClass('animating');
  });

  it('calls useHandleClickOutside hook', () => {
    const store = createMockStore(true);
    const useHandleClickOutside = require('../../../../renderer/hooks/useHandleClickOutside');

    render(
      <Provider store={store}>
        <SideBar />
      </Provider>,
    );

    // Ensure that the useHandleClickOutside hook was called
    expect(useHandleClickOutside).toHaveBeenCalled();
  });
});
