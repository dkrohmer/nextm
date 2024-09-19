import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridTypeNone from '../../../../renderer/components/Settings/GridTypeNone';
import windowElectron from '../../../../../mocks/window-electron';

// Mock useSelector and useDispatch hooks
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
    // Mock useSelector to return gridVisible as 'mesh'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'mesh',
        },
      })
    );

    // Render the component
    render(<GridTypeNone />);

    // Check if the radio button for 'None' is rendered
    const noneRadioButton = screen.getByTestId('grid-type-none-radio');
    expect(noneRadioButton).toBeInTheDocument();

    // Check if it is not selected by default
    expect(noneRadioButton).not.toHaveClass("checked");
  });

  it('renders the None radio button and checks if it is selected when gridVisible is "none"', () => {
    // Mock useSelector to return gridVisible as 'none'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'none',
        },
      })
    );

    // Render the component
    render(<GridTypeNone />);

    // Check if the radio button for 'None' is rendered
    const noneRadioButton = screen.getByTestId('grid-type-none-radio');
    expect(noneRadioButton).toBeInTheDocument();

    // Check if it is selected
    expect(noneRadioButton).toHaveClass("checked");
  });

  it('dispatches actions when the None radio button is selected', () => {
    // Mock useSelector to return gridVisible as 'mesh'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'mesh',
        },
      })
    );

    // Render the component
    render(<GridTypeNone />);

    // Get the radio button
    const noneRadioButton = screen.getByTestId('grid-type-none-radio');

    // Simulate selecting the None radio button
    fireEvent.click(within(noneRadioButton).getByRole('radio'));

    // Check if window.electron.setGridType was called with 'none'
    expect(window.electron.setGridType).toHaveBeenCalledWith('none');

    // Check if the setGridVisible action was dispatched with 'none'
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setGridVisible', payload: 'none' });

    // Check if showToast action was dispatched with the correct success message
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'settings/showToast',
      payload: expect.objectContaining({
        successMessage: 'Grid type changed to: none',
      }),
    }));
  });
});
