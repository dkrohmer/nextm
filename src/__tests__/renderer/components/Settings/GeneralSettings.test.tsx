import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer, {
  initialSettingsState,
} from '../../../../renderer/store/settings';
import GeneralSettings from '../../../../renderer/components/Settings/GeneralSettings';

// Mocking child components
jest.mock(
  '../../../../renderer/components/Settings/DatabaseType',
  () =>
    function () {
      return <div>DatabaseType Component</div>;
    },
);

// Mock store with initial state
const mockStore = configureStore({
  reducer: {
    settings: settingsReducer,
  },
  preloadedState: {
    settings: initialSettingsState,
  },
});

const renderWithProviders = (component: React.ReactElement, store: any) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('GeneralSettings Component', () => {
  it('toggles the accordion content visibility when clicked', () => {
    renderWithProviders(<GeneralSettings />, mockStore);

    // Initially, the accordion content should be hidden
    const accordionTitle = screen.getByText('General Settings');
    const iconElement = accordionTitle.querySelector('i');

    expect(iconElement).toHaveClass('caret right icon');

    // Simulate a click to expand the accordion
    fireEvent.click(accordionTitle);

    // Check if the icon has changed to show the accordion is expanded
    expect(iconElement).toHaveClass('caret down icon');

    // Simulate another click to collapse the accordion
    fireEvent.click(accordionTitle);

    // The icon should revert back to its original state
    expect(iconElement).toHaveClass('caret right icon');
  });
});
