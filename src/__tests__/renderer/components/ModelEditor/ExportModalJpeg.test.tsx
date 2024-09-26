import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ExportModalJpeg from '../../../../renderer/components/ModelEditor/ExportModalJpeg'; // Adjust the path as needed
import { setExportFormat } from '../../../../renderer/store/modelEditor';

// Mock useDispatch and useSelector hooks
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
    // Set up the mock to return exportFormat as "jpeg"
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'jpeg',
        },
      }),
    );

    render(<ExportModalJpeg />);

    // Select the radio button using data-testid
    const jpegRadioButton = screen.getByTestId('jpeg-radio');

    // Ensure the radio button is in the document and is checked
    expect(jpegRadioButton).toBeInTheDocument();
    expect(jpegRadioButton).toHaveClass('checked');
  });

  it('renders the radio button with the correct state when exportFormat is not "jpeg"', () => {
    // Set up the mock to return exportFormat as something other than "jpeg"
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'png',
        },
      }),
    );

    render(<ExportModalJpeg />);

    // Select the radio button using data-testid
    const jpegRadioButton = screen.getByTestId('jpeg-radio');

    // Ensure the radio button is in the document and is not checked
    expect(jpegRadioButton).toBeInTheDocument();
    expect(jpegRadioButton).not.toHaveClass('checked');
  });

  it('dispatches setExportFormat with "jpeg" when the radio button is clicked', () => {
    // Set up the mock to return any initial exportFormat
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'png', // or any format other than "jpeg"
        },
      }),
    );

    render(<ExportModalJpeg />);

    // Select the radio button using data-testid
    fireEvent.click(within(screen.getByTestId('jpeg-form')).getByRole('radio'));

    // Verify that dispatch was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setExportFormat('jpeg'));
  });
});
