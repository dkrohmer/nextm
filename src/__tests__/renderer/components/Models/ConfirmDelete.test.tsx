// ConfirmDelete.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmDelete from '../../../../renderer/components/Models/ConfirmDelete';
import { deleteModel } from '../../../../renderer/services/api/models';
import { setModelsConfirmOpen } from '../../../../renderer/store/models';

// Mocking useDispatch, useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

// Mock deleteModel API call
jest.mock('../../../../renderer/services/api/models', () => ({
  deleteModel: jest.fn(),
}));

describe('ConfirmDelete Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Confirm dialog when modelsConfirmOpen is true', () => {
    // Mock useSelector to return modelsConfirmOpen as true
    mockUseSelector.mockImplementation((selector: any) => selector({
      models: { modelsConfirmOpen: true, modelToDelete: { id: '1', name: 'Test Model' } }
    }));

    // Render the ConfirmDelete component
    render(<ConfirmDelete />);

    // Check if the Confirm dialog is rendered
    expect(screen.getByText(/Do you want to delete this model permanently\?/i)).toBeInTheDocument();
  });

  it('does not render the Confirm dialog when modelsConfirmOpen is false', () => {
    // Mock useSelector to return modelsConfirmOpen as false
    mockUseSelector.mockImplementation((selector: any) => selector({
      models: { modelsConfirmOpen: false, modelToDelete: null }
    }));

    // Render the ConfirmDelete component
    render(<ConfirmDelete />);

    // Check if the Confirm dialog is not rendered
    expect(screen.queryByText(/Do you want to delete this model permanently\?/i)).not.toBeInTheDocument();
  });

  it('handles confirm action correctly', () => {
    // Mock useSelector to return the modelToDelete
    mockUseSelector.mockImplementation((selector: any) => selector({
      models: { modelsConfirmOpen: true, modelToDelete: { id: '1', name: 'Test Model' } }
    }));

    render(<ConfirmDelete />);

    // Simulate clicking the confirm button
    fireEvent.click(screen.getByText('OK'));

    // Ensure the deleteModel action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(deleteModel('1'));
  });

  it('handles cancel action correctly', () => {
    // Mock useSelector to return modelsConfirmOpen as true
    mockUseSelector.mockImplementation((selector: any) => selector({
      models: { modelsConfirmOpen: true, modelToDelete: { id: '1', name: 'Test Model' } }
    }));

    render(<ConfirmDelete />);

    // Simulate clicking the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure the setModelsConfirmOpen action is dispatched with false
    expect(mockDispatch).toHaveBeenCalledWith(setModelsConfirmOpen(false));
  });
});
