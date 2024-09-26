import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer, {
  initialSettingsState,
} from '../../../../renderer/store/settings';
import GeneralSettings from '../../../../renderer/components/Settings/GeneralSettings';
import '@testing-library/jest-dom';

jest.mock(
  '../../../../renderer/components/Settings/DatabaseType',
  () =>
    function () {
      return <div>DatabaseType Component</div>;
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

describe('GeneralSettings Component', () => {
  it('toggles the accordion content visibility when clicked', () => {
    renderWithProviders(<GeneralSettings />, mockStore);

    const accordionTitle = screen.getByText('General Settings');
    const iconElement = accordionTitle.querySelector('i');

    expect(iconElement).toHaveClass('caret right icon');

    fireEvent.click(accordionTitle);

    expect(iconElement).toHaveClass('caret down icon');

    fireEvent.click(accordionTitle);

    expect(iconElement).toHaveClass('caret right icon');
  });
});
