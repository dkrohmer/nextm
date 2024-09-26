import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DatabaseTypeSubmitButton from '../../../../renderer/components/Settings/DatabaseTypeSubmitButton';
import windowElectron from '../../../../../mocks/window-electron';

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Open',
          path: '/mock/default/path',
          inputPath: '',
        },
      }),
    );

    render(<DatabaseTypeSubmitButton />);

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Open');

    expect(submitButton).toBeDisabled();
  });

  it('enables the submit button when a valid inputPath is provided', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Open',
          path: '/mock/default/path',
          inputPath: '/mock/input/path',
        },
      }),
    );

    render(<DatabaseTypeSubmitButton />);

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('calls the correct electron API and dispatches actions on form submission (Open)', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Open',
          path: '/mock/default/path',
          inputPath: '/mock/input/path',
        },
      }),
    );

    window.electron.createDatabase('/mocked/path');
    window.electron.getCurrentDbPath();

    render(<DatabaseTypeSubmitButton />);

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.electron.openDatabase).toHaveBeenCalledWith(
        '/mock/input/path',
      );

      expect(window.electron.getCurrentDbPath).toHaveBeenCalled();

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setDatabasePath',
        payload: '/mock/current/db/path',
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'settings/showToast',
          payload: expect.objectContaining({
            successMessage: 'Current database: /mock/current/db/path',
          }),
        }),
      );

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('calls the correct electron API and dispatches actions on form submission (Create)', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Create',
          path: '/mock/default/path',
          inputPath: '/mock/input/path',
        },
      }),
    );

    window.electron.createDatabase('/mock/path');
    window.electron.getCurrentDbPath();

    render(<DatabaseTypeSubmitButton />);

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.electron.createDatabase).toHaveBeenCalledWith(
        '/mock/input/path',
      );
      expect(window.electron.getCurrentDbPath).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setDatabasePath',
        payload: '/mock/current/db/path',
      });
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'settings/showToast',
          payload: expect.objectContaining({
            successMessage: 'Current database: /mock/current/db/path',
          }),
        }),
      );
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('throws an error when inputPath is empty', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Create',
          path: null,
          inputPath: null,
        },
      }),
    );

    window.electron = {
      ...windowElectron,
      createDatabase: jest.fn().mockResolvedValue({ success: false }),
    };

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<DatabaseTypeSubmitButton />);

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error processing form submission:',
        expect.any(Error),
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it('handles backend failure and throws an error', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          buttonLabel: 'Create',
          path: '/mock/default/path',
          inputPath: '/mock/input/path',
        },
      }),
    );

    window.electron = {
      ...windowElectron,
      createDatabase: jest.fn().mockResolvedValue({ success: false }),
    };

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<DatabaseTypeSubmitButton />);

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error processing form submission:',
        expect.any(Error),
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
