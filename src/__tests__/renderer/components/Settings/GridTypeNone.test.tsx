import { render, screen, fireEvent, within } from '@testing-library/react';
import GridTypeNone from '../../../../renderer/components/Settings/GridTypeNone';
import windowElectron from '../../../../../mocks/window-electron';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

window.electron = windowElectron;

describe('GridTypeNone Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the None radio button and checks if it is not selected when gridVisible is not "none"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'mesh',
        },
      }),
    );

    render(<GridTypeNone />);

    const noneRadioButton = screen.getByTestId('grid-type-none-radio');
    expect(noneRadioButton).toBeInTheDocument();
    expect(noneRadioButton).not.toHaveClass('checked');
  });

  it('renders the None radio button and checks if it is selected when gridVisible is "none"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'none',
        },
      }),
    );

    render(<GridTypeNone />);

    const noneRadioButton = screen.getByTestId('grid-type-none-radio');
    expect(noneRadioButton).toBeInTheDocument();
    expect(noneRadioButton).toHaveClass('checked');
  });

  it('dispatches actions when the None radio button is selected', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'mesh',
        },
      }),
    );

    render(<GridTypeNone />);

    const noneRadioButton = screen.getByTestId('grid-type-none-radio');

    fireEvent.click(within(noneRadioButton).getByRole('radio'));

    expect(window.electron.setGridType).toHaveBeenCalledWith('none');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setGridVisible',
      payload: 'none',
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'settings/showToast',
        payload: expect.objectContaining({
          successMessage: 'Grid type changed to: none',
        }),
      }),
    );
  });
});
