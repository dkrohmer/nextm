import { render, screen, fireEvent, within } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setExportFormat } from '../../../../renderer/store/modelEditor';
import ExportModalSvg from '../../../../renderer/components/ModelEditor/ExportModalSvg';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ExportModalSvg Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the radio button with the correct state when exportFormat is "svg"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'svg',
        },
      }),
    );

    render(<ExportModalSvg />);

    const svgRadioButton = screen.getByTestId('svg-radio');

    expect(svgRadioButton).toBeInTheDocument();
    expect(svgRadioButton).toHaveClass('checked');
  });

  it('renders the radio button with the correct state when exportFormat is not "svg"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'jpeg',
        },
      }),
    );

    render(<ExportModalSvg />);

    const svgRadioButton = screen.getByTestId('svg-radio');

    expect(svgRadioButton).toBeInTheDocument();
    expect(svgRadioButton).not.toHaveClass('checked');
  });

  it('dispatches setExportFormat with "svg" when the radio button is clicked', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'jpeg',
        },
      }),
    );

    render(<ExportModalSvg />);

    fireEvent.click(within(screen.getByTestId('svg-form')).getByRole('radio'));

    expect(mockDispatch).toHaveBeenCalledWith(setExportFormat('svg'));
  });
});
