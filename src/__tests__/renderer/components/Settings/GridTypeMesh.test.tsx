import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridTypeMesh from '../../../../renderer/components/Settings/GridTypeMesh';
import windowElectron from '../../../../../mocks/window-electron';

// Mock useSelector and useDispatch hooks
const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

window.electron = windowElectron

describe('GridTypeMesh Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Mesh radio button and checks if it is not selected when gridVisible is not "mesh"', () => {
    // Mock useSelector to return gridVisible as 'none'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'none',
        },
      })
    );

    // Render the component
    render(<GridTypeMesh />);

    // Check if the radio button for 'Mesh' is rendered
    const meshRadioButton = screen.getByTestId('grid-type-mesh-radio');
    expect(meshRadioButton).toBeInTheDocument();

    // Check if it is not selected by default
    expect(meshRadioButton).not.toHaveClass("checked");
  });

  it('renders the Mesh radio button and checks if it is selected when gridVisible is "mesh"', () => {
    // Mock useSelector to return gridVisible as 'mesh'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'mesh',
        },
      })
    );

    // Render the component
    render(<GridTypeMesh />);

    // Check if the radio button for 'Mesh' is rendered
    const meshRadioButton = screen.getByTestId('grid-type-mesh-radio');
    expect(meshRadioButton).toBeInTheDocument();

    // Check if it is selected
    expect(meshRadioButton).toHaveClass("checked");
  });

  it('dispatches actions when the Mesh radio button is selected', () => {
    // Mock useSelector to return gridVisible as 'none'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'none',
        },
      })
    );

    // Render the component
    render(<GridTypeMesh />);

    // Get the radio button
    const meshRadioButton = screen.getByTestId('grid-type-mesh-radio');

    // Simulate selecting the Mesh radio button
    fireEvent.click(within(meshRadioButton).getByRole('radio'));

    // Check if window.electron.setGridType was called with 'mesh'
    expect(window.electron.setGridType).toHaveBeenCalledWith('mesh');

    // Check if the setGridVisible action was dispatched with 'mesh'
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setGridVisible', payload: 'mesh' });

    // Check if showToast action was dispatched with the correct success message
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'settings/showToast',
      payload: expect.objectContaining({
        successMessage: 'Grid type changed to: mesh',
      }),
    }));
  });
});
