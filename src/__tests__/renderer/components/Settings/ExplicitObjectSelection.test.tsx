import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import ExplicitObjectSelection from '../../../../renderer/components/Settings/ExplicitObjectSelection';
import windowElectron from '../../../../../mocks/window-electron';
import '@testing-library/jest-dom';

window.electron = windowElectron;

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

describe('ExplicitObjectSelection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the explicit object selection section and info popup', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          explicitObjectSelection: false,
        },
      }),
    );

    render(<ExplicitObjectSelection />);

    expect(
      screen.getByText('Set explicit object selection'),
    ).toBeInTheDocument();

    const infoIcon = screen.getByTestId('info-icon');
    expect(infoIcon).toBeInTheDocument();

    fireEvent.mouseEnter(infoIcon);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
      expect(
        screen.getByText(
          'If explicit object selection is active, you cannot context-click an object unless it has previously been selected with a left mouse click.',
        ),
      ).toBeInTheDocument();
    });

    fireEvent.mouseLeave(infoIcon);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });

  it('sets explicit object selection to active when inactive checkbox is clicked', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          explicitObjectSelection: false,
        },
      }),
    );

    render(<ExplicitObjectSelection />);

    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(within(checkbox).getByRole('checkbox'));
    expect(window.electron.setExplicitObjectSelection).toHaveBeenCalledWith(
      true,
    );
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setExplicitObjectSelection',
      payload: true,
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'settings/showToast',
        payload: expect.objectContaining({
          successMessage: 'Explicit object selection active',
        }),
      }),
    );
  });

  it('sets explicit object selection to inactive when active checkbox is clicked', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          explicitObjectSelection: true,
        },
      }),
    );

    render(<ExplicitObjectSelection />);

    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(within(checkbox).getByRole('checkbox'));
    expect(window.electron.setExplicitObjectSelection).toHaveBeenCalledWith(
      false,
    );
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setExplicitObjectSelection',
      payload: false,
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'settings/showToast',
        payload: expect.objectContaining({
          successMessage: 'Explicit object selection inactive',
        }),
      }),
    );
  });
});
