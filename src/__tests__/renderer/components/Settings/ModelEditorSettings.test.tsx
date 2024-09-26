import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer, { initialSettingsState } from '../../../../renderer/store/settings';
import ModelEditorSettings from '../../../../renderer/components/Settings/ModelEditorSettings';
import '@testing-library/jest-dom';

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

    const accordionTitle = screen.getByText('Model Editor Settings');
    const iconElement = accordionTitle.querySelector('i');

    expect(iconElement).toHaveClass('caret right icon');

    fireEvent.click(accordionTitle);

    expect(iconElement).toHaveClass('caret down icon');

    fireEvent.click(accordionTitle);

    expect(iconElement).toHaveClass('caret right icon');
  });
});
