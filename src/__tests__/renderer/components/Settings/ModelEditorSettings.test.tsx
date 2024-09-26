import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer, {
  initialSettingsState,
  setActiveSettingsIndex,
} from '../../../../renderer/store/settings';
import ModelEditorSettings from '../../../../renderer/components/Settings/ModelEditorSettings';

// Mocking child components
jest.mock(
  '../../../../renderer/components/Settings/GridType',
  () =>
    function () {
      return <div>SetGridType Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Settings/ExplicitObjectSelection',
  () =>
    function () {
      return <div>SetExplicitObjectSelection Component</div>;
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

describe('ModelEditorSettings Component', () => {
  it('toggles the accordion content visibility when clicked', () => {
    renderWithProviders(<ModelEditorSettings />, mockStore);

    // Initially, the accordion content should be hidden
    const accordionTitle = screen.getByText('Model Editor Settings');
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
