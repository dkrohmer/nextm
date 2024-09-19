import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridTypeDot from '../../../../renderer/components/Settings/GridTypeDot';
import windowElectron from '../../../../../mocks/window-electron';

// Mock useSelector and useDispatch hooks
const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

window.electron = windowElectron

describe('GridTypeDot Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Dot radio button and checks if it is not selected when gridVisible is not "dot"', () => {
    // Mock useSelector to return gridVisible as 'none'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'none',
        },
      })
    );

    // Render the component
    render(<GridTypeDot />);

    // Check if the radio button for 'Dot' is rendered
    const dotRadioButton = screen.getByTestId('grid-type-dot-radio');
    expect(dotRadioButton).toBeInTheDocument();

    // Check if it is not selected by default
    expect(dotRadioButton).not.toHaveClass("checked");
  });

  it('renders the Dot radio button and checks if it is selected when gridVisible is "dot"', () => {
    // Mock useSelector to return gridVisible as 'dot'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'dot',
        },
      })
    );

    // Render the component
    render(<GridTypeDot />);

    // Check if the radio button for 'Dot' is rendered
    const dotRadioButton = screen.getByTestId('grid-type-dot-radio');
    expect(dotRadioButton).toBeInTheDocument();

    // Check if it is selected
    expect(dotRadioButton).toHaveClass("checked"); // Updated from .toBeChecked()
  });

  it('dispatches actions when the Dot radio button is selected', () => {
    // Mock useSelector to return gridVisible as 'none'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'none',
        },
      })
    );

    // Render the component
    render(<GridTypeDot />);

    // Get the radio button
    const dotRadioButton = screen.getByTestId('grid-type-dot-radio');

    // Simulate selecting the Dot radio button
    fireEvent.click(within(dotRadioButton).getByRole('radio'));

    // Check if window.electron.setGridType was called with 'dot'
    expect(window.electron.setGridType).toHaveBeenCalledWith('dot');

    // Check if the setGridVisible action was dispatched with 'dot'
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setGridVisible', payload: 'dot' });

    // Check if showToast action was dispatched with the correct success message
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'settings/showToast',
      payload: expect.objectContaining({
        successMessage: 'Grid type changed to: dot',
      }),
    }));
  });
});
