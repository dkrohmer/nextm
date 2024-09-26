import { render, screen, fireEvent, within } from '@testing-library/react';
import GridTypeDot from '../../../../renderer/components/Settings/GridTypeDot';
import windowElectron from '../../../../../mocks/window-electron';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

window.electron = windowElectron;

describe('GridTypeDot Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Dot radio button and checks if it is not selected when gridVisible is not "dot"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'none',
        },
      }),
    );

    render(<GridTypeDot />);

    const dotRadioButton = screen.getByTestId('grid-type-dot-radio');
    expect(dotRadioButton).toBeInTheDocument();

    expect(dotRadioButton).not.toHaveClass('checked');
  });

  it('renders the Dot radio button and checks if it is selected when gridVisible is "dot"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'dot',
        },
      }),
    );

    render(<GridTypeDot />);

    const dotRadioButton = screen.getByTestId('grid-type-dot-radio');
    expect(dotRadioButton).toBeInTheDocument();

    expect(dotRadioButton).toHaveClass('checked');
  });

  it('dispatches actions when the Dot radio button is selected', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'none',
        },
      }),
    );

    render(<GridTypeDot />);

    const dotRadioButton = screen.getByTestId('grid-type-dot-radio');

    fireEvent.click(within(dotRadioButton).getByRole('radio'));

    expect(window.electron.setGridType).toHaveBeenCalledWith('dot');

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setGridVisible',
      payload: 'dot',
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'settings/showToast',
        payload: expect.objectContaining({
          successMessage: 'Grid type changed to: dot',
        }),
      }),
    );
  });
});
