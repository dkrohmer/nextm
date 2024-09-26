import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DatabaseTypePicker from '../../../../renderer/components/Settings/DatabaseTypePicker';
import windowElectron from '../../../../../mocks/window-electron';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          path: '/mock/default/path',
          inputPath: '/mock/input/path',
          useDefaultDatabase: true,
        },
      }),
    );

    render(<DatabaseTypePicker />);

    const openExistingButton = screen.getByText('Open existing');
    const createNewButton = screen.getByText('Create new');
    const inputField = screen.getByPlaceholderText('/mock/default/path');

    expect(openExistingButton).toBeInTheDocument();
    expect(createNewButton).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('/mock/input/path');
  });

  it('calls openFilePicker and dispatches correct actions when "Open existing" is clicked', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: true,
          path: '/mock/default/path',
          inputPath: '',
        },
      }),
    );

    window.electron.openDirectoryPicker();

    render(<DatabaseTypePicker />);

    const openExistingButton = screen.getByText('Open existing');
    fireEvent.click(openExistingButton);

    await waitFor(() => {
      expect(window.electron.openFilePicker).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setButtonLabel',
        payload: 'Open',
      });
    });
  });

  it('calls openFilePicker and dispatches setCustomDatabasePath when useDefaultDatabase is false', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
          path: '/mock/default/path',
          inputPath: '',
        },
      }),
    );

    window.electron.openDirectoryPicker();

    render(<DatabaseTypePicker />);

    const openExistingButton = screen.getByText('Open existing');
    fireEvent.click(openExistingButton);

    await waitFor(() => {
      expect(window.electron.openFilePicker).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setButtonLabel',
        payload: 'Open',
      });
    });
  });

  it('calls openDirectoryPicker and dispatches correct actions when "Create new" is clicked', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
          path: '/mock/default/path',
          inputPath: '',
        },
      }),
    );

    window.electron.openDirectoryPicker();

    render(<DatabaseTypePicker />);

    const createNewButton = screen.getByText('Create new');
    fireEvent.click(createNewButton);

    await waitFor(() => {
      expect(window.electron.openDirectoryPicker).toHaveBeenCalled();

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setButtonLabel',
        payload: 'Create',
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setInputPath',
        payload: '/mock/directory/path',
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setCustomDatabasePath',
        payload: '/mock/directory/path',
      });
    });
  });

  it('updates the input field when the user types a new path', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
          path: '/mock/default/path',
          inputPath: '',
        },
      }),
    );

    render(<DatabaseTypePicker />);

    const inputField = screen.getByPlaceholderText('/mock/default/path');
    fireEvent.change(inputField, { target: { value: '/mock/new/path' } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setInputPath',
      payload: '/mock/new/path',
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setCustomDatabasePath',
      payload: '/mock/new/path',
    });
  });
});
