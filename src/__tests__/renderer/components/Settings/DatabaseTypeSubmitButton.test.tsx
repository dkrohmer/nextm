import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import DatabaseTypeSubmitButton from '../../../../renderer/components/Settings/DatabaseTypeSubmitButton';
import windowElectron from '../../../../../mocks/window-electron';

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

// Mock useSelector, useDispatch, and useNavigate hooks
jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

window.electron = windowElectron;

describe('DatabaseTypeSubmitButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the submit button with the correct label and checks if it is disabled', () => {
    // Mock useSelector to return buttonLabel, path, and inputPath
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Open',
          path: '/mock/default/path',
          inputPath: '',
        },
      }),
    );

    // Render the component
    render(<DatabaseTypeSubmitButton />);

    // Check if the button is rendered with the correct label
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Open');

    // Check if the button is disabled when inputPath is empty
    expect(submitButton).toBeDisabled();
  });

  it('enables the submit button when a valid inputPath is provided', () => {
    // Mock useSelector to return a valid inputPath
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Open',
          path: '/mock/default/path',
          inputPath: '/mock/input/path',
        },
      }),
    );

    // Render the component
    render(<DatabaseTypeSubmitButton />);

    // Check if the button is enabled when inputPath is not empty
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('calls the correct electron API and dispatches actions on form submission (Open)', async () => {
    // Mock useSelector to return valid inputPath and buttonLabel as 'Open'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Open',
          path: '/mock/default/path',
          inputPath: '/mock/input/path',
        },
      }),
    );

    // Mock electron API
    window.electron.createDatabase('/mocked/path');
    window.electron.getCurrentDbPath();

    // Render the component
    render(<DatabaseTypeSubmitButton />);

    // Simulate clicking the submit button
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Wait for the async action to complete
    await waitFor(() => {
      // Check if window.electron.openDatabase was called with the correct path
      expect(window.electron.openDatabase).toHaveBeenCalledWith(
        '/mock/input/path',
      );

      // Check if getCurrentDbPath was called
      expect(window.electron.getCurrentDbPath).toHaveBeenCalled();

      // Check if setDatabasePath was dispatched with the correct path
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setDatabasePath',
        payload: '/mock/current/db/path',
      });

      // Check if showToast was dispatched with the correct success message
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'settings/showToast',
          payload: expect.objectContaining({
            successMessage: 'Current database: /mock/current/db/path',
          }),
        }),
      );

      // Check if navigate was called to redirect the user
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('calls the correct electron API and dispatches actions on form submission (Create)', async () => {
    // Mock useSelector to return valid inputPath and buttonLabel as 'Create'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Create',
          path: '/mock/default/path',
          inputPath: '/mock/input/path',
        },
      }),
    );

    // Mock electron API to resolve with success
    window.electron.createDatabase('/mock/path');
    window.electron.getCurrentDbPath();

    // Render the component
    render(<DatabaseTypeSubmitButton />);

    // Simulate clicking the submit button
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Wait for the async action to complete
    await waitFor(() => {
      // Check if window.electron.createDatabase was called with the correct path
      expect(window.electron.createDatabase).toHaveBeenCalledWith(
        '/mock/input/path',
      );

      // Check if getCurrentDbPath was called
      expect(window.electron.getCurrentDbPath).toHaveBeenCalled();

      // Check if setDatabasePath was dispatched with the correct path
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setDatabasePath',
        payload: '/mock/current/db/path',
      });

      // Check if showToast was dispatched with the correct success message
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'settings/showToast',
          payload: expect.objectContaining({
            successMessage: 'Current database: /mock/current/db/path',
          }),
        }),
      );

      // Check if navigate was called to redirect the user
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('throws an error when inputPath is empty', async () => {
    // Mock useSelector to return valid inputPath and buttonLabel as 'Create'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Create',
          path: null,
          inputPath: null,
        },
      }),
    );

    // Mock electron API to simulate backend failure
    window.electron = {
      ...windowElectron,
      createDatabase: jest.fn().mockResolvedValue({ success: false }),
    };

    // Spy on console.error to capture the error message
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Render the component
    render(<DatabaseTypeSubmitButton />);

    // Simulate clicking the submit button
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Wait for async action to complete
    await waitFor(() => {
      // Check if the backend failure was handled
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error processing form submission:',
        expect.any(Error),
      );
    });

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it('handles backend failure and throws an error', async () => {
    // Mock useSelector to return valid inputPath and buttonLabel as 'Create'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Create',
          path: '/mock/default/path',
          inputPath: '/mock/input/path',
        },
      }),
    );

    // Mock electron API to simulate backend failure
    window.electron = {
      ...windowElectron,
      createDatabase: jest.fn().mockResolvedValue({ success: false }),
    };

    // Spy on console.error to capture the error message
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Render the component
    render(<DatabaseTypeSubmitButton />);

    // Simulate clicking the submit button
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Wait for async action to complete
    await waitFor(() => {
      // Check if the backend failure was handled
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error processing form submission:',
        expect.any(Error),
      );
    });

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});
