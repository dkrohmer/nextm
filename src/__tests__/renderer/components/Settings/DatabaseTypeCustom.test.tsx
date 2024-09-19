import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatabaseTypeCustom from '../../../../renderer/components/Settings/DatabaseTypeCustom';
import windowElectron from '../../../../../mocks/window-electron';

// Mock useSelector and useDispatch hooks
const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

window.electron = windowElectron;

describe('DatabaseTypeCustom Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Custom database radio button and checks if it is not selected when useDefaultDatabase is true', () => {
    // Mock useSelector to return useDefaultDatabase as true
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: true,
          customDatabasePath: '',
        },
      })
    );

    // Render the component
    render(<DatabaseTypeCustom />);

    // Check if the radio button for 'Custom database' is rendered
    const customDatabaseRadioButton = screen.getByTestId('custom-db-radio');
    expect(customDatabaseRadioButton).toBeInTheDocument();

    // Check if it is not selected by default
    expect(customDatabaseRadioButton).not.toBeChecked();
  });

  it('renders the Custom database radio button and checks if it is selected when useDefaultDatabase is false', () => {
    // Mock useSelector to return useDefaultDatabase as false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
          customDatabasePath: '',
        },
      })
    );

    // Render the component
    render(<DatabaseTypeCustom />);

    // Check if the radio button for 'Custom database' is rendered
    const customDatabaseRadioButton = screen.getByTestId('custom-db-radio');
    expect(customDatabaseRadioButton).toBeInTheDocument();

    // Check if it is selected
    expect(customDatabaseRadioButton).toHaveClass('checked');
  });

  it('dispatches actions when the Custom database radio button is selected and customDatabasePath is truthy', () => {
    // Mock useSelector to return useDefaultDatabase as true and customDatabasePath as a non-empty string
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: true,
          customDatabasePath: '/mock/path',
        },
      })
    );

    // Render the component
    render(<DatabaseTypeCustom />);

    // Get the radio button
    const customDatabaseRadioButton = screen.getByTestId('custom-db-radio');

    // Simulate selecting the Custom database radio button
    fireEvent.click(within(customDatabaseRadioButton).getByRole('radio'));

    // Check if the setUseDefaultDatabase action was dispatched with false
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setUseDefaultDatabase', payload: false });

    // Check if the setButtonLabel action was dispatched with 'Open'
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setButtonLabel', payload: 'Open' });

    // Check if the setInputPath action was dispatched with the custom database path
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setInputPath', payload: '/mock/path' });
  });

  it('dispatches actions when the Custom database radio button is selected and customDatabasePath is falsy', () => {
    // Mock useSelector to return useDefaultDatabase as true and customDatabasePath as an empty string
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: true,
          customDatabasePath: '',
        },
      })
    );

    // Render the component
    render(<DatabaseTypeCustom />);

    // Get the radio button
    const customDatabaseRadioButton = screen.getByTestId('custom-db-radio');

    // Simulate selecting the Custom database radio button
    fireEvent.click(within(customDatabaseRadioButton).getByRole('radio'));

    // Check if the setUseDefaultDatabase action was dispatched with false
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setUseDefaultDatabase', payload: false });

    // Check if the setButtonLabel action was dispatched with 'Open'
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setButtonLabel', payload: 'Open' });

    // Check if the setInputPath action was dispatched with an empty string
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setInputPath', payload: '' });
  });
});
