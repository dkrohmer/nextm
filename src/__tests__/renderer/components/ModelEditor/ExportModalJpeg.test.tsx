import { render, screen, fireEvent, within } from '@testing-library/react';
import { jest } from '@jest/globals';
import ExportModalJpeg from '../../../../renderer/components/ModelEditor/ExportModalJpeg';
import { setExportFormat } from '../../../../renderer/store/modelEditor';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ExportModalJpeg Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the radio button with the correct state when exportFormat is "jpeg"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'jpeg',
        },
      }),
    );

    render(<ExportModalJpeg />);

    const jpegRadioButton = screen.getByTestId('jpeg-radio');

    expect(jpegRadioButton).toBeInTheDocument();
    expect(jpegRadioButton).toHaveClass('checked');
  });

  it('renders the radio button with the correct state when exportFormat is not "jpeg"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'png',
        },
      }),
    );

    render(<ExportModalJpeg />);

    const jpegRadioButton = screen.getByTestId('jpeg-radio');

    expect(jpegRadioButton).toBeInTheDocument();
    expect(jpegRadioButton).not.toHaveClass('checked');
  });

  it('dispatches setExportFormat with "jpeg" when the radio button is clicked', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'png',
        },
      }),
    );

    render(<ExportModalJpeg />);

    fireEvent.click(within(screen.getByTestId('jpeg-form')).getByRole('radio'));

    expect(mockDispatch).toHaveBeenCalledWith(setExportFormat('jpeg'));
  });
});
