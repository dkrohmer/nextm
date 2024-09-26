import { render, screen, fireEvent, within } from '@testing-library/react';
import GridTypeMesh from '../../../../renderer/components/Settings/GridTypeMesh';
import windowElectron from '../../../../../mocks/window-electron';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

window.electron = windowElectron;

describe('GridTypeMesh Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Mesh radio button and checks if it is not selected when gridVisible is not "mesh"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'none',
        },
      }),
    );

    render(<GridTypeMesh />);

    const meshRadioButton = screen.getByTestId('grid-type-mesh-radio');
    expect(meshRadioButton).toBeInTheDocument();
    expect(meshRadioButton).not.toHaveClass('checked');
  });

  it('renders the Mesh radio button and checks if it is selected when gridVisible is "mesh"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'mesh',
        },
      }),
    );

    render(<GridTypeMesh />);

    const meshRadioButton = screen.getByTestId('grid-type-mesh-radio');
    expect(meshRadioButton).toBeInTheDocument();
    expect(meshRadioButton).toHaveClass('checked');
  });

  it('dispatches actions when the Mesh radio button is selected', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          gridVisible: 'none',
        },
      }),
    );

    render(<GridTypeMesh />);

    const meshRadioButton = screen.getByTestId('grid-type-mesh-radio');

    fireEvent.click(within(meshRadioButton).getByRole('radio'));

    expect(window.electron.setGridType).toHaveBeenCalledWith('mesh');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setGridVisible',
      payload: 'mesh',
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'settings/showToast',
        payload: expect.objectContaining({
          successMessage: 'Grid type changed to: mesh',
        }),
      }),
    );
  });
});
