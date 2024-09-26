import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import {
  setCurrentIncrement,
  setIncrementsIsCloning,
  setIncrementsIsEditing,
  setIncrementsModalOpen,
} from '../../../../renderer/store/increments';
import ModalCancelButton from '../../../../renderer/components/Increments/ModalCancelButton';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('ModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches correct actions on click', () => {
    render(<ModalCancelButton />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsModalOpen(false));
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentIncrement(null));
    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsIsCloning(false));
    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsIsEditing(false));
  });
});
