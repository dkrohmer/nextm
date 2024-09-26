import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import settingsReducer from '../../../../renderer/store/settings';
import GridType from '../../../../renderer/components/Settings/GridType';

// Mock Redux store
const mockStore = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe('GridType Component', () => {
  it('renders the grid type section and info popup', async () => {
    renderWithProviders(<GridType />);

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
      expect(
        screen.getByText('Choose the type of grid for the model editor.'),
      ).toBeInTheDocument();
    });

    // Simulate mouse leave to hide the popup
    fireEvent.mouseLeave(infoIcon);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });
});
