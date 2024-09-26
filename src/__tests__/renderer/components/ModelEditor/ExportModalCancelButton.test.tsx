import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ExportModalCancel from '../../../../renderer/components/ModelEditor/ExportModalCancelButton';
import { setExportModalOpen } from '../../../../renderer/store/modelEditor';

// Mock the useDispatch hook
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('ExportModalCancel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous calls to mock functions
  });

  it('dispatches correct actions on click', () => {
    // Render the component
    render(<ExportModalCancel />);

    // Simulate button click
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setExportModalOpen(false));
  });
});
