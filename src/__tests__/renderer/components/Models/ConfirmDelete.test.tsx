import { render, screen, fireEvent } from '@testing-library/react';
import { deleteModel } from '../../../../renderer/services/api/models';
import { setModelsConfirmOpen } from '../../../../renderer/store/models';
import ConfirmDelete from '../../../../renderer/components/Models/ConfirmDelete';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('../../../../renderer/services/api/models', () => ({
  deleteModel: jest.fn(),
}));

describe('ConfirmDelete Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Confirm dialog when modelsConfirmOpen is true', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsConfirmOpen: true,
          modelToDelete: { id: '1', name: 'Test Model' },
        },
      }),
    );

    render(<ConfirmDelete />);

    expect(
      screen.getByText(/Do you want to delete this model permanently\?/i),
    ).toBeInTheDocument();
  });

  it('does not render the Confirm dialog when modelsConfirmOpen is false', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: { modelsConfirmOpen: false, modelToDelete: null },
      }),
    );

    render(<ConfirmDelete />);

    expect(
      screen.queryByText(/Do you want to delete this model permanently\?/i),
    ).not.toBeInTheDocument();
  });

  it('handles confirm action correctly', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsConfirmOpen: true,
          modelToDelete: { id: '1', name: 'Test Model' },
        },
      }),
    );

    render(<ConfirmDelete />);

    fireEvent.click(screen.getByText('OK'));

    expect(mockDispatch).toHaveBeenCalledWith(deleteModel('1'));
  });

  it('handles cancel action correctly', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsConfirmOpen: true,
          modelToDelete: { id: '1', name: 'Test Model' },
        },
      }),
    );

    render(<ConfirmDelete />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockDispatch).toHaveBeenCalledWith(setModelsConfirmOpen(false));
  });
});
