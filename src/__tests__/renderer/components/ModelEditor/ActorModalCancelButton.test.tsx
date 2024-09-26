import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ActorModalCancelButton from '../../../../renderer/components/ModelEditor/ActorModalCancelButton';
import { setActorModalOpen } from '../../../../renderer/store/modelEditor';

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
    render(<ActorModalCancelButton />);

    // Simulate button click
    fireEvent.click(screen.getByText('Cancel'));

    // Check if dispatch is called with the correct actions
    expect(mockDispatch).toHaveBeenCalledWith(setActorModalOpen(false));
  });
});
