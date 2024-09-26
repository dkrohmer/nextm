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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: true,
        },
      }),
    );

    render(<DatabaseTypeDefault />);

    const defaultDatabaseRadioButton = screen.getByTestId('default-db-radio');
    expect(defaultDatabaseRadioButton).toBeInTheDocument();
    expect(defaultDatabaseRadioButton).toHaveClass('checked');
  });

  it('renders the Default database radio button and checks if it is not selected when useDefaultDatabase is false', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
        },
      }),
    );

    render(<DatabaseTypeDefault />);

    const defaultDatabaseRadioButton = screen.getByTestId('default-db-radio');
    expect(defaultDatabaseRadioButton).toBeInTheDocument();
    expect(defaultDatabaseRadioButton).not.toBeChecked();
  });

  it('dispatches actions when the Default database radio button is selected', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
        },
      }),
    );

    window.electron.getDefaultDbPath();

    render(<DatabaseTypeDefault />);

    const defaultDatabaseRadioButton = screen.getByTestId('default-db-radio');

    fireEvent.click(within(defaultDatabaseRadioButton).getByRole('radio'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setUseDefaultDatabase',
      payload: true,
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setButtonLabel',
      payload: 'Open',
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'settings/setInputPath',
        payload: '/mock/default/db/path',
      });
    });
  });
});
