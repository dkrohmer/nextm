import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import settingsReducer from '../../../../renderer/store/settings';
import Settings from '../../../../renderer/components/Settings/index';
import '@testing-library/jest-dom';

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

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('General Settings Component')).toBeInTheDocument();
    expect(screen.getByText('Model Editor Settings Component')).toBeInTheDocument();
  });
});
