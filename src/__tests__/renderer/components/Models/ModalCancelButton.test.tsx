import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import {
  setModelsCurrentModel,
  setModelsIsCloning,
  setModelsIsEditing,
  setModelsModalOpen,
} from '../../../../renderer/store/models';
import ModalCancelButton from '../../../../renderer/components/Models/ModalCancelButton';
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

    expect(mockDispatch).toHaveBeenCalledWith(setModelsModalOpen(false));
    expect(mockDispatch).toHaveBeenCalledWith(setModelsCurrentModel(null));
    expect(mockDispatch).toHaveBeenCalledWith(setModelsIsCloning(false));
    expect(mockDispatch).toHaveBeenCalledWith(setModelsIsEditing(false));
  });
});
