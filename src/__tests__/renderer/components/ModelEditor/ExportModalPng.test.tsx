import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ExportModalPng from '../../../../renderer/components/ModelEditor/ExportModalPng'; // Adjust the path as needed
import { setExportFormat } from '../../../../renderer/store/modelEditor';

// Mock useDispatch and useSelector hooks
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
    // Set up the mock to return exportFormat as "png"
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'png',
        },
      }),
    );

    render(<ExportModalPng />);

    // Select the radio button using data-testid
    const pngRadioButton = screen.getByTestId('png-radio');

    // Ensure the radio button is in the document and is checked
    expect(pngRadioButton).toBeInTheDocument();
    expect(pngRadioButton).toHaveClass('checked');
  });

  it('renders the radio button with the correct state when exportFormat is not "png"', () => {
    // Set up the mock to return exportFormat as something other than "png"
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'jpeg',
        },
      }),
    );

    render(<ExportModalPng />);

    // Select the radio button using data-testid
    const pngRadioButton = screen.getByTestId('png-radio');

    // Ensure the radio button is in the document and is not checked
    expect(pngRadioButton).toBeInTheDocument();
    expect(pngRadioButton).not.toHaveClass('checked');
  });

  it('dispatches setExportFormat with "png" when the radio button is clicked', () => {
    // Set up the mock to return any initial exportFormat
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          exportFormat: 'jpeg', // or any format other than "png"
        },
      }),
    );

    render(<ExportModalPng />);

    // Select the radio button using data-testid
    fireEvent.click(within(screen.getByTestId('png-form')).getByRole('radio'));

    // Verify that dispatch was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setExportFormat('png'));
  });
});
