import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ExportModalSvg from '../../../../renderer/components/ModelEditor/ExportModalSvg'; // Adjust the path as needed
import { setExportFormat } from '../../../../renderer/store/modelEditor';

// Mock useDispatch and useSelector hooks
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
    // Set up the mock to return exportFormat as "svg"
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'svg',
        },
      }),
    );

    render(<ExportModalSvg />);

    // Select the radio button using data-testid
    const svgRadioButton = screen.getByTestId('svg-radio');

    // Ensure the radio button is in the document and is checked
    expect(svgRadioButton).toBeInTheDocument();
    expect(svgRadioButton).toHaveClass('checked');
  });

  it('renders the radio button with the correct state when exportFormat is not "svg"', () => {
    // Set up the mock to return exportFormat as something other than "svg"
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'jpeg',
        },
      }),
    );

    render(<ExportModalSvg />);

    // Select the radio button using data-testid
    const svgRadioButton = screen.getByTestId('svg-radio');

    // Ensure the radio button is in the document and is not checked
    expect(svgRadioButton).toBeInTheDocument();
    expect(svgRadioButton).not.toHaveClass('checked');
  });

  it('dispatches setExportFormat with "svg" when the radio button is clicked', () => {
    // Set up the mock to return any initial exportFormat
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'jpeg', // or any format other than "svg"
        },
      }),
    );

    render(<ExportModalSvg />);

    // Select the radio button using data-testid
    fireEvent.click(within(screen.getByTestId('svg-form')).getByRole('radio'));

    // Verify that dispatch was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setExportFormat('svg'));
  });
});
