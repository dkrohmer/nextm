import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ExportModalJson from '../../../../renderer/components/ModelEditor/ExportModalJson'; // Adjust the path as needed
import { setExportFormat } from '../../../../renderer/store/modelEditor';

// Mock useDispatch and useSelector hooks
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
    // Set up the mock to return exportFormat as "json"
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'json',
        },
      }),
    );

    render(<ExportModalJson />);

    // Select the radio button using data-testid
    const jsonRadioButton = screen.getByTestId('json-radio');

    // Ensure the radio button is in the document and is checked
    expect(jsonRadioButton).toBeInTheDocument();
    expect(jsonRadioButton).toHaveClass('checked');
  });

  it('renders the radio button with the correct state when exportFormat is not "json"', () => {
    // Set up the mock to return exportFormat as something other than "json"
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'png',
        },
      }),
    );

    render(<ExportModalJson />);

    // Select the radio button using data-testid
    const jsonRadioButton = screen.getByTestId('json-radio');

    // Ensure the radio button is in the document and is not checked
    expect(jsonRadioButton).toBeInTheDocument();
    expect(jsonRadioButton).not.toHaveClass('checked');
  });

  it('dispatches setExportFormat with "json" when the radio button is clicked', () => {
    // Set up the mock to return any initial exportFormat
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'png', // or any format other than "json"
        },
      }),
    );

    render(<ExportModalJson />);

    // Select the radio button using data-testid
    fireEvent.click(within(screen.getByTestId('json-form')).getByRole('radio'));

    // Verify that dispatch was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setExportFormat('json'));
  });
});
