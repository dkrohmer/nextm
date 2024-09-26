import React from 'react';
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import DatabaseTypeDefault from '../../../../renderer/components/Settings/DatabaseTypeDefault';
import windowElectron from '../../../../../mocks/window-electron';

// Mock useSelector and useDispatch hooks
const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

window.electron = windowElectron;

describe('DatabaseTypeDefault Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Default database radio button and checks if it is selected when useDefaultDatabase is true', () => {
    // Mock useSelector to return useDefaultDatabase as true
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: true,
        },
      }),
    );

    // Render the component
    render(<DatabaseTypeDefault />);

    // Check if the radio button for 'Default database' is rendered
    const defaultDatabaseRadioButton = screen.getByTestId('default-db-radio');
    expect(defaultDatabaseRadioButton).toBeInTheDocument();

    // Check if it is selected by default
    expect(defaultDatabaseRadioButton).toHaveClass('checked');
  });

  it('renders the Default database radio button and checks if it is not selected when useDefaultDatabase is false', () => {
    // Mock useSelector to return useDefaultDatabase as false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
        },
      }),
    );

    // Render the component
    render(<DatabaseTypeDefault />);

    // Check if the radio button for 'Default database' is rendered
    const defaultDatabaseRadioButton = screen.getByTestId('default-db-radio');
    expect(defaultDatabaseRadioButton).toBeInTheDocument();

    // Check if it is not selected
    expect(defaultDatabaseRadioButton).not.toBeChecked();
  });

  it('dispatches actions when the Default database radio button is selected', async () => {
    // Mock useSelector to return useDefaultDatabase as false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
        },
      }),
    );

    // Mock the electron API to return a mock path
    window.electron.getDefaultDbPath();

    // Render the component
    render(<DatabaseTypeDefault />);

    // Get the radio button
    const defaultDatabaseRadioButton = screen.getByTestId('default-db-radio');

    // Simulate selecting the Default database radio button
    fireEvent.click(within(defaultDatabaseRadioButton).getByRole('radio'));

    // Check if the setUseDefaultDatabase action was dispatched with true
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setUseDefaultDatabase',
      payload: true,
    });

    // Check if the setButtonLabel action was dispatched with 'Open'
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setButtonLabel',
      payload: 'Open',
    });

    // Wait for the async action to be dispatched
    await waitFor(() => {
      // Check if the setInputPath action was dispatched with the default database path
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setInputPath',
        payload: '/mock/default/db/path',
      });
    });
  });
});
