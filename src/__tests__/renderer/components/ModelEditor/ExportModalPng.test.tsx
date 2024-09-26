import { render, screen, fireEvent, within } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setExportFormat } from '../../../../renderer/store/modelEditor';
import ExportModalPng from '../../../../renderer/components/ModelEditor/ExportModalPng';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ExportModalPng Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the radio button with the correct state when exportFormat is "png"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'png',
        },
      }),
    );

    render(<ExportModalPng />);

    const pngRadioButton = screen.getByTestId('png-radio');

    expect(pngRadioButton).toBeInTheDocument();
    expect(pngRadioButton).toHaveClass('checked');
  });

  it('renders the radio button with the correct state when exportFormat is not "png"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'jpeg',
        },
      }),
    );

    render(<ExportModalPng />);

    const pngRadioButton = screen.getByTestId('png-radio');

    expect(pngRadioButton).toBeInTheDocument();
    expect(pngRadioButton).not.toHaveClass('checked');
  });

  it('dispatches setExportFormat with "png" when the radio button is clicked', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'jpeg',
        },
      }),
    );

    render(<ExportModalPng />);

    fireEvent.click(within(screen.getByTestId('png-form')).getByRole('radio'));

    expect(mockDispatch).toHaveBeenCalledWith(setExportFormat('png'));
  });
});
