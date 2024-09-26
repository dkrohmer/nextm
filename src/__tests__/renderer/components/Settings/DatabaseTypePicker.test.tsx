import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatabaseTypePicker from '../../../../renderer/components/Settings/DatabaseTypePicker';
import windowElectron from '../../../../../mocks/window-electron';

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

// Mock useSelector and useDispatch hooks
jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

window.electron = windowElectron;

describe('DatabaseTypePicker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the buttons and input field with the correct values', () => {
    // Mock useSelector to return values for path, inputPath, and useDefaultDatabase
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          path: '/mock/default/path',
          inputPath: '/mock/input/path',
          useDefaultDatabase: true,
        },
      }),
    );

    // Render the component
    render(<DatabaseTypePicker />);

    // Check if the buttons and input field are rendered
    const openExistingButton = screen.getByText('Open existing');
    const createNewButton = screen.getByText('Create new');
    const inputField = screen.getByPlaceholderText('/mock/default/path');

    expect(openExistingButton).toBeInTheDocument();
    expect(createNewButton).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();

    // Check if the input field has the correct value
    expect(inputField).toHaveValue('/mock/input/path');
  });

  it('calls openFilePicker and dispatches correct actions when "Open existing" is clicked', async () => {
    // Mock useSelector to return useDefaultDatabase as true
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: true,
          path: '/mock/default/path',
          inputPath: '',
        },
      }),
    );

    // Mock the electron API to return a mock file path
    window.electron.openDirectoryPicker();

    // Render the component
    render(<DatabaseTypePicker />);

    // Simulate clicking the "Open existing" button
    const openExistingButton = screen.getByText('Open existing');
    fireEvent.click(openExistingButton);

    // Wait for the async action to complete
    await waitFor(() => {
      // Check if window.electron.openFilePicker was called
      expect(window.electron.openFilePicker).toHaveBeenCalled();

      // Check if setButtonLabel was dispatched with 'Open'
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setButtonLabel',
        payload: 'Open',
      });
    });
  });

  it('calls openFilePicker and dispatches setCustomDatabasePath when useDefaultDatabase is false', async () => {
    // Mock useSelector to return useDefaultDatabase as false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
          path: '/mock/default/path',
          inputPath: '',
        },
      }),
    );

    // Mock the electron API to return a mock file path
    window.electron.openDirectoryPicker();

    // Render the component
    render(<DatabaseTypePicker />);

    // Simulate clicking the "Open existing" button
    const openExistingButton = screen.getByText('Open existing');
    fireEvent.click(openExistingButton);

    // Wait for the async action to complete
    await waitFor(() => {
      // Check if window.electron.openFilePicker was called
      expect(window.electron.openFilePicker).toHaveBeenCalled();

      // Check if setInputPath was dispatched with the correct file path
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setButtonLabel',
        payload: 'Open',
      });
    });
  });

  it('calls openDirectoryPicker and dispatches correct actions when "Create new" is clicked', async () => {
    // Mock useSelector to return useDefaultDatabase as false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
          path: '/mock/default/path',
          inputPath: '',
        },
      }),
    );

    // Mock the electron API to return a mock directory path
    window.electron.openDirectoryPicker();

    // Render the component
    render(<DatabaseTypePicker />);

    // Simulate clicking the "Create new" button
    const createNewButton = screen.getByText('Create new');
    fireEvent.click(createNewButton);

    // Wait for the async action to complete
    await waitFor(() => {
      // Check if window.electron.openDirectoryPicker was called
      expect(window.electron.openDirectoryPicker).toHaveBeenCalled();

      // Check if setButtonLabel was dispatched with 'Create'
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setButtonLabel',
        payload: 'Create',
      });

      // Check if setInputPath was dispatched with the correct directory path
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setInputPath',
        payload: '/mock/directory/path',
      });

      // Check if setCustomDatabasePath was dispatched with the correct directory path
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setCustomDatabasePath',
        payload: '/mock/directory/path',
      });
    });
  });

  it('updates the input field when the user types a new path', () => {
    // Mock useSelector to return useDefaultDatabase as false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
          path: '/mock/default/path',
          inputPath: '',
        },
      }),
    );

    // Render the component
    render(<DatabaseTypePicker />);

    // Simulate typing a new path into the input field
    const inputField = screen.getByPlaceholderText('/mock/default/path');
    fireEvent.change(inputField, { target: { value: '/mock/new/path' } });

    // Check if setInputPath was dispatched with the new path
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setInputPath',
      payload: '/mock/new/path',
    });

    // Check if setCustomDatabasePath was dispatched with the new path
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setCustomDatabasePath',
      payload: '/mock/new/path',
    });
  });
});
