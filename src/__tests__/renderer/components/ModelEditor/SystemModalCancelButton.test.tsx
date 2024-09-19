import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import SystemModalCancelButton from '../../../../renderer/components/ModelEditor/SystemModalCancelButton';
import { setSystemModalOpen } from '../../../../renderer/store/modelEditor';

// Mock the useDispatch hook
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('SystemModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the cancel button', () => {
    render(<SystemModalCancelButton />);
    
    // Check if the button is rendered with the correct label
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('dispatches setSystemModalOpen(false) when clicked', () => {
    render(<SystemModalCancelButton />);
    
    // Trigger the click event on the button
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    
    // Verify that the correct action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(setSystemModalOpen(false));
  });
});
