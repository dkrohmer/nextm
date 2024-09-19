import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalCancelButton from '../../../../renderer/components/Increments/ModalCancelButton';
import { setCurrentIncrement, setIncrementsIsCloning, setIncrementsIsEditing, setIncrementsModalOpen } from '../../../../renderer/store/increments';
import { jest } from '@jest/globals';

// Mock the useDispatch hook
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('ModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches correct actions on click', () => {
    // Render the component
    render(<ModalCancelButton />);

    // Simulate button click
    fireEvent.click(screen.getByText('Cancel'));

    // Check if dispatch is called with the correct actions
    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsModalOpen(false));
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentIncrement(null));
    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsIsCloning(false));
    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsIsEditing(false));
  });
});
