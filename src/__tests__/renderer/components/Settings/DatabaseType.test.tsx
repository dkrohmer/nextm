import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import settingsReducer, {
  initialSettingsState,
} from '../../../../renderer/store/settings';
import DatabaseType from '../../../../renderer/components/Settings/DatabaseType';
import windowElectron from '../../../../../mocks/window-electron';

window.electron = windowElectron;

// Mock store with initial state
const mockStore = configureStore({
  reducer: {
    settings: settingsReducer,
  },
  preloadedState: {
    settings: initialSettingsState,
  },
});

// Mocking useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock store
const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
  preloadedState: {
    settings: initialSettingsState,
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe('DatabaseType Component', () => {
  it('renders the database type section and info popup', async () => {
    renderWithProviders(<DatabaseType />);

    // Check for the settings label
    expect(screen.getByTestId('settings-label')).toBeInTheDocument();

    // Check for the info icon
    const infoIcon = screen.getByTestId('info-icon');
    expect(infoIcon).toBeInTheDocument();

    // Simulate mouse hover on the info icon to trigger the popup
    fireEvent.mouseEnter(infoIcon);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    // Simulate mouse leave to hide the popup
    fireEvent.mouseLeave(infoIcon);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });
});
