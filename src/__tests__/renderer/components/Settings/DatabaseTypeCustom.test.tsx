import { render, screen, fireEvent, within } from '@testing-library/react';
import DatabaseTypeCustom from '../../../../renderer/components/Settings/DatabaseTypeCustom';
import windowElectron from '../../../../../mocks/window-electron';
import '@testing-library/jest-dom';

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: true,
          customDatabasePath: '',
        },
      }),
    );

    render(<DatabaseTypeCustom />);

    const customDatabaseRadioButton = screen.getByTestId('custom-db-radio');
    expect(customDatabaseRadioButton).toBeInTheDocument();
    expect(customDatabaseRadioButton).not.toBeChecked();
  });

  it('renders the Custom database radio button and checks if it is selected when useDefaultDatabase is false', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: false,
          customDatabasePath: '',
        },
      }),
    );

    render(<DatabaseTypeCustom />);

    const customDatabaseRadioButton = screen.getByTestId('custom-db-radio');
    expect(customDatabaseRadioButton).toBeInTheDocument();
    expect(customDatabaseRadioButton).toHaveClass('checked');
  });

  it('dispatches actions when the Custom database radio button is selected and customDatabasePath is truthy', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: true,
          customDatabasePath: '/mock/path',
        },
      }),
    );

    render(<DatabaseTypeCustom />);

    const customDatabaseRadioButton = screen.getByTestId('custom-db-radio');

    fireEvent.click(within(customDatabaseRadioButton).getByRole('radio'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setUseDefaultDatabase',
      payload: false,
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setButtonLabel',
      payload: 'Open',
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setInputPath',
      payload: '/mock/path',
    });
  });

  it('dispatches actions when the Custom database radio button is selected and customDatabasePath is falsy', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          useDefaultDatabase: true,
          customDatabasePath: '',
        },
      }),
    );

    render(<DatabaseTypeCustom />);

    const customDatabaseRadioButton = screen.getByTestId('custom-db-radio');

    fireEvent.click(within(customDatabaseRadioButton).getByRole('radio'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setUseDefaultDatabase',
      payload: false,
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setButtonLabel',
      payload: 'Open',
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setInputPath',
      payload: '',
    });
  });
});
