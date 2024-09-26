import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import settingsReducer from '../../../../renderer/store/settings';
import Settings from '../../../../renderer/components/Settings/index';
import GeneralSettings from '../../../../renderer/components/Settings/GeneralSettings';
import ModelEditorSettings from '../../../../renderer/components/Settings/ModelEditorSettings';

// Mocking child components
jest.mock(
  '../../../../renderer/components/Settings/GeneralSettings',
  () =>
    function () {
      return <div>General Settings Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Settings/ModelEditorSettings',
  () =>
    function () {
      return <div>Model Editor Settings Component</div>;
    },
);

// Configure mock store
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

describe('Settings Component', () => {
  it('renders the settings title and accordion sections', () => {
    renderWithProviders(<Settings />);

    // Check if the settings title is rendered
    expect(screen.getByText('Settings')).toBeInTheDocument();

    // Check if the GeneralSettings and ModelEditorSettings components are rendered
    expect(screen.getByText('General Settings Component')).toBeInTheDocument();
    expect(
      screen.getByText('Model Editor Settings Component'),
    ).toBeInTheDocument();
  });
});
