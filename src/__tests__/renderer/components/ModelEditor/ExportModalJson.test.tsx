import { render, screen, fireEvent, within } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setExportFormat } from '../../../../renderer/store/modelEditor';
import ExportModalJson from '../../../../renderer/components/ModelEditor/ExportModalJson';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ExportModalJson Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the radio button with the correct state when exportFormat is "json"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'json',
        },
      }),
    );

    render(<ExportModalJson />);

    const jsonRadioButton = screen.getByTestId('json-radio');

    expect(jsonRadioButton).toBeInTheDocument();
    expect(jsonRadioButton).toHaveClass('checked');
  });

  it('renders the radio button with the correct state when exportFormat is not "json"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'png',
        },
      }),
    );

    render(<ExportModalJson />);

    const jsonRadioButton = screen.getByTestId('json-radio');

    expect(jsonRadioButton).toBeInTheDocument();
    expect(jsonRadioButton).not.toHaveClass('checked');
  });

  it('dispatches setExportFormat with "json" when the radio button is clicked', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'png',
        },
      }),
    );

    render(<ExportModalJson />);

    fireEvent.click(within(screen.getByTestId('json-form')).getByRole('radio'));

    expect(mockDispatch).toHaveBeenCalledWith(setExportFormat('json'));
  });
});
